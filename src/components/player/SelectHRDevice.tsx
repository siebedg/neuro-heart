// src/components/SelectHRDevice.tsx
import React, { useState } from "react";
import { BleManager, Device } from "react-native-ble-plx";
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { knownDevices } from "@/src/config/bleDevices";
import { log } from "@/src/utils/log.util";

const manager = new BleManager();

export default function SelectHRDevice({
  onSelect,
}: {
  onSelect: (deviceKeyword: string) => void;
}) {
  const [scanning, setScanning] = useState(false);
  const [foundLabels, setFoundLabels] = useState<string[]>([]);

  const startScan = () => {
    setFoundLabels([]);
    setScanning(true);

    manager.startDeviceScan(null, null, (err, device) => {
      if (err) {
        manager.stopDeviceScan();
        setScanning(false);
        return;
      }
      const name = device?.name?.toLowerCase();
      if (!name) return;
      const match = knownDevices.find((d) =>
        name.includes(d.keyword.toLowerCase())
      );
      if (match && !foundLabels.includes(match.label)) {
        log(`✅ Matched device: ${match.label}`, "BLE");
        setFoundLabels((p) => [...p, match.label]);
      }
    });

    setTimeout(() => {
      manager.stopDeviceScan();
      setScanning(false);
    }, 5000);
  };

  if (scanning) {
    return <ActivityIndicator size="large" />;
  }

  if (foundLabels.length === 0) {
    return (
      <View>
        <Button title="Scan for HR Device" onPress={startScan} />
        <Text style={{ marginTop: 8, textAlign: "center" }}>
          Tap to scan…
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={foundLabels}
      keyExtractor={(item) => item}
      renderItem={({ item }) => {
        const keyword = knownDevices.find((d) => d.label === item)!.keyword;
        return (
          <View style={{ margin: 10 }}>
            <Text>{item}</Text>
            <Button
              title="Select"
              onPress={() => {
                onSelect(keyword);
              }}
            />
          </View>
        );
      }}
    />
  );
}
