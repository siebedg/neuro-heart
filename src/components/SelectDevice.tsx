// src/components/SelectHRDevice.tsx
import React, { useState, useEffect } from "react";
import { BleManager, Device } from "react-native-ble-plx";
import { View, Text, Button, FlatList, ActivityIndicator } from "react-native";
import { knownDevices } from "@/src/config/bleDevices";
import { log } from "@/src/utils/log.util";

const manager = new BleManager();

export default function SelectHRDevice({
  onSelect,
}: {
  onSelect: (deviceKeyword: string) => void;
}) {
  const [deviceNames, setDeviceNames] = useState<string[]>([]);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    setScanning(true);
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) return;

      const name = device?.name?.toLowerCase();
      if (!name) return;

      // Check of het overeenkomt met een bekende keyword
      const match = knownDevices.find((d) =>
        name.includes(d.keyword.toLowerCase())
      );
      if (match && !deviceNames.includes(match.label)) {
        log(`✅ Matched device: ${match.label}`, "BLE");
        setDeviceNames((prev) => [...prev, match.label]);
      }
    });

    const timeoutId = setTimeout(() => {
      manager.stopDeviceScan();
      setScanning(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
      manager.stopDeviceScan();
    };
  }, [deviceNames]);

  if (scanning) return <ActivityIndicator size="large" />;
  if (deviceNames.length === 0) return <Text>No known HR devices found.</Text>;

  return (
    <FlatList
      data={deviceNames}
      keyExtractor={(item) => item}
      renderItem={({ item }) => {
        const keyword = knownDevices.find((d) => d.label === item)?.keyword;
        return (
          <View style={{ margin: 10 }}>
            <Text>{item}</Text>
            <Button title="Select" onPress={() => onSelect(keyword!)} />
          </View>
        );
      }}
    />
  );
}
