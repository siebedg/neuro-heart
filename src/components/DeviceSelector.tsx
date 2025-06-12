// DeviceSelector.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { BleManager } from "react-native-ble-plx";
import { knownDevices } from "@/src/config/bleDevices";
import { log } from "@/src/utils/log.util";

const manager = new BleManager();

export default function DeviceSelector({
  onConnect,
  onStart,
  onStop,
  isPlaying,
  currentHeartRateData,
}: {
  onConnect: () => void;
  onStart: () => void;
  onStop: () => void;
  isPlaying: boolean;
  currentHeartRateData: any;
}) {
  const [scanning, setScanning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<{
    label: string;
    keyword: string;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deviceFound, setDeviceFound] = useState(false);

  const startScanForDevice = (device: { label: string; keyword: string }) => {
    setScanning(true);
    setSelectedDevice(device);
    setDeviceFound(false);

    manager.startDeviceScan(null, null, (error, deviceScanned) => {
      if (error) return;

      const name = deviceScanned?.name?.toLowerCase();
      if (!name) return;

      if (name.includes(device.keyword.toLowerCase())) {
        log(`✅ Connecting to ${device.label}`, "BLE");
        manager.stopDeviceScan();
        setDeviceFound(true);
        setScanning(false);
        onConnect();
      }
    });

    setTimeout(() => {
      manager.stopDeviceScan();
      if (!deviceFound) {
        setSelectedDevice(null);
      }
      setScanning(false);
    }, 7000);
  };

  return (
    <View className="w-full max-w-sm mb-10 items-center">
      {!selectedDevice ? (
        <>
          <Text className="text-white text-2xl font-semibold mb-8">
            Choose your HR device
          </Text>

          {showModal ? (
            <View className="bg-[#1e1e2e] pl-6 pr-6 pb-6 rounded-xl w-full">
              {/* <Text className="text-white text-lg font-semibold mb-4 text-center">
                Available Devices
              </Text> */}
              <FlatList
                data={knownDevices}
                keyExtractor={(item) => item.label}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="bg-white/10 p-4 rounded-xl border border-white/20 mb-3"
                    onPress={() => {
                      setShowModal(false);
                      startScanForDevice(item);
                    }}
                  >
                    <Text className="text-white text-base font-medium">
                      {item.label}
                    </Text>
                    <Text className="text-white/50 text-sm">Scan & Connect</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                className="mt-4 p-2 rounded-full bg-white/10 border border-white/20"
                onPress={() => setShowModal(false)}
              >
                <Text className="text-white p-4 text-center">Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              className="bg-white/10 p-4 rounded-xl border border-white/20 w-full"
              onPress={() => setShowModal(true)}
            >
              <Text className="text-white text-center text-base">
                Select device
              </Text>
            </TouchableOpacity>
          )}
        </>
      ) : scanning ? (
        <>
          <ActivityIndicator size="large" color="white" />
          <Text className="text-white/60 mt-6">
            Scanning for {selectedDevice.label}…
          </Text>
        </>
      ) : deviceFound ? (
        <>
          <Text className="text-white text-base mb-2">Connected to:</Text>
          <Text className="text-white font-semibold text-lg mb-4">
            {selectedDevice.label}
          </Text>

          <TouchableOpacity
            className="bg-white/10 border border-white/30 rounded-full py-4 px-10"
            onPress={isPlaying ? onStop : onStart}
          >
            <Text className="text-white text-lg font-semibold">
              {isPlaying ? "Stop Session" : "Start Session"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text className="text-white/60 mt-4">Device not found. Try again.</Text>
          <TouchableOpacity
            className="mt-4 p-2 rounded-full bg-white/10 border border-white/20"
            onPress={() => setSelectedDevice(null)}
          >
            <Text className="text-white text-center">Retry</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
