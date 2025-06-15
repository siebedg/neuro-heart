import { useEffect, useRef } from "react";
import { Buffer } from "buffer";
import { BleManager, Device, Subscription } from "react-native-ble-plx";
import useHeartRateStore from "@/src/store/heartRateStore";
import { log, errorLog } from "@/src/utils/log.util";
import {
  classifyHR,
  resetHeartRateSmoothing,
} from "@/src/utils/hr/hrZoneClassifier";
import { requestBLEPermissions } from "@/src/utils/ble/permission.util";
import useSessionManager from "../useSessionManager";
import { logHeartRateToFirestore } from "@/src/services/heartRateService";

const HR_SERVICE_UUID = "180d";
const HR_CHARACTERISTIC_UUID = "2a37";

const manager = new BleManager();

export default function useBLEHeartRate(deviceKeyword: string) {
  const { sessionId } = useSessionManager();
  const setHr = useHeartRateStore((s) => s.setHr);
  const addHrToHistory = useHeartRateStore((s) => s.addHrToHistory);
  const setCurrentHeartRateData = useHeartRateStore(
    (s) => s.setCurrentHeartRateData
  );

  const deviceRef = useRef<Device | null>(null);
  const subscriptionRef = useRef<Subscription | null>(null);
  const scanningRef = useRef(false);

  useEffect(() => {
    if (!deviceKeyword || deviceKeyword.length < 2) return;

    resetHeartRateSmoothing();

    const scanAndConnect = async () => {
      const granted = await requestBLEPermissions();
      if (!granted) {
        errorLog("❌ BLE permissions not granted", "BLE");
        return;
      }

      const state = await manager.state();
      if (state !== "PoweredOn") {
        errorLog("❌ Bluetooth is not powered on.", "BLE");
        return;
      }

      if (scanningRef.current) {
        log("⚠️ Scan already running, aborting duplicate", "BLE");
        return;
      }
      scanningRef.current = true;

      log("🔍 Scanning for HRM...", "BLE");

      manager.startDeviceScan(null, null, async (error, device) => {
        if (error) {
          errorLog(`❌ Scan error: ${error.message}`, "BLE");
          scanningRef.current = false;
          return;
        }

        if (device?.name?.toLowerCase().includes(deviceKeyword)) {
          log(`✅ Found device: ${device.name}`, "BLE");
          manager.stopDeviceScan();
          scanningRef.current = false;

          try {
            const connectedDevice = await device.connect();
            deviceRef.current = connectedDevice;
            log(`🔗 Connected to ${device.name}`, "BLE");

            deviceRef.current?.onDisconnected(() => {
              errorLog("❌ HRM disconnected, retrying scan...", "BLE");
              scanAndConnect(); // auto-reconnect
            });

            await connectedDevice.discoverAllServicesAndCharacteristics();

            const sub = await connectedDevice.monitorCharacteristicForService(
              HR_SERVICE_UUID,
              HR_CHARACTERISTIC_UUID,
              (err, characteristic) => {
                if (err) {
                  errorLog(`❌ Monitor error: ${err.message}`, "BLE");
                  return;
                }

                if (!characteristic?.value) return;

                const raw = Buffer.from(characteristic.value, "base64");
                const hrValue = raw[1]; // second byte = HR in BPM
                log(`❤️ HR received: ${hrValue}`, "BLE");

                setHr(hrValue);
                addHrToHistory(hrValue);

                const zoneInfo = classifyHR(hrValue, {
                  hrRest: 60,
                  hrMax: 190,
                  age: 35,
                  fitnessLevel: "intermediate",
                });

                setCurrentHeartRateData({
                  timestamp: Date.now(),
                  heartRate: hrValue,
                  zone: zoneInfo,
                });

                logHeartRateToFirestore(
                  hrValue,
                  deviceKeyword,
                  sessionId ?? undefined
                );
              }
            );

            subscriptionRef.current = sub;
          } catch (e) {
            errorLog(`❌ Connection failed: ${e}`, "BLE");
          }
        }
      });

      // Auto-timeout just in case
      setTimeout(() => {
        manager.stopDeviceScan();
        scanningRef.current = false;
        log("⏹️ Scan timeout reached", "BLE");
      }, 10000);
    };

    scanAndConnect();

    return () => {
      subscriptionRef.current?.remove();
      subscriptionRef.current = null;
      deviceRef.current?.cancelConnection();
      deviceRef.current = null;
      manager.stopDeviceScan();
      scanningRef.current = false;
      log("🔌 BLE connection cleaned up", "BLE");
    };
  }, [deviceKeyword]);
}
