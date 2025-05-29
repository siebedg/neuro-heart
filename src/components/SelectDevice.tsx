// src/components/SelectHRDevice.tsx
import React, { useState, useEffect } from "react";
import { BleManager, Device } from "react-native-ble-plx";
import { View, Text, Button, FlatList, ActivityIndicator } from "react-native";
import { log } from "@/src/utils/log.util";

const manager = new BleManager();

export default function SelectHRDevice({
  onSelect,
}: {
  onSelect: (device: Device) => void;
}) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    setScanning(true);
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) return;

      if (device?.name && !devices.find((d) => d.id === device.id)) {
        log(`🔍 Found: ${device.name}`, "BLE");
        setDevices((prev) => [...prev, device]);
      }
    });

    setTimeout(() => {
      manager.stopDeviceScan();
      setScanning(false);
    }, 5000);

    return () => {
      manager.stopDeviceScan();
    };
  }, []);

  if (scanning) return <ActivityIndicator size="large" />;
  if (devices.length === 0) return <Text>No devices found.</Text>;

  return (
    <FlatList
      data={devices}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ margin: 10 }}>
          <Text>{item.name || "Unnamed Device"}</Text>
          <Button title="Select" onPress={() => onSelect(item)} />
        </View>
      )}
    />
  );
}
