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

  useEffect(() => {
    if (!deviceKeyword || deviceKeyword.length < 2) return;

    resetHeartRateSmoothing();

    const scanAndConnect = async () => {
      const granted = await requestBLEPermissions();
      if (!granted) return;

      log("🔍 Scanning for HRM...", "BLE");

      manager.startDeviceScan(null, null, async (error, device) => {
        if (error) {
          errorLog(`Scan error: ${error.message}`, "BLE");
          return;
        }

        if (device?.name?.toLowerCase().includes(deviceKeyword)) {
          log(`✅ Found device: ${device.name}`, "BLE");
          manager.stopDeviceScan();

          try {
            const connectedDevice = await device.connect();
            deviceRef.current = connectedDevice;
            log(`🔗 Connected to ${device.name}`, "BLE");

            deviceRef.current?.onDisconnected((error) => {
              errorLog("❌ HRM disconnected, retrying scan...", "BLE");
              scanAndConnect();
            });

            await connectedDevice.discoverAllServicesAndCharacteristics();

            const char = await connectedDevice.monitorCharacteristicForService(
              HR_SERVICE_UUID,
              HR_CHARACTERISTIC_UUID,
              (error, characteristic) => {
                if (error) {
                  errorLog(`Monitor error: ${error.message}`, "BLE");
                  return;
                }

                if (!characteristic?.value) return;

                const raw = Buffer.from(characteristic.value, "base64");
                const hrValue = raw[1]; // 2nd byte = HR in BPM
                log(`❤️  HR received: ${hrValue}`, "BLE");

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

            subscriptionRef.current = char;
          } catch (e) {
            errorLog(`Connection failed: ${e}`, "BLE");
          }
        }
      });
    };

    scanAndConnect();

    return () => {
      subscriptionRef.current?.remove();
      deviceRef.current?.cancelConnection();
      log("🔌 BLE connection cleaned up", "BLE");
    };
  }, [deviceKeyword]);
}
