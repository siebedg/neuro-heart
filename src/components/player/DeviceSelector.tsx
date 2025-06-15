import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { knownDevices } from "@/src/config/bleDevices";
import useSettingsStore from "@/src/store/settingsStore";

export default function DeviceSelector({
  onConnect,
}: {
  onConnect: () => void;
}) {
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const setKeyword = useSettingsStore((s) => s.setSelectedDeviceKeyword);

  if (!showList) {
    return (
      <View className="items-center mb-10">
        <Text className="text-white text-2xl font-semibold mb-8">
          Choose your HR device
        </Text>
        <TouchableOpacity
          className="bg-white/10 p-4 rounded-xl border border-white/20"
          onPress={() => setShowList(true)}
        >
          <Text className="text-white text-base text-center">
            Scan & Connect
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="items-center mb-10">
        <ActivityIndicator size="large" color="white" />
        <Text className="text-white mt-4 text-lg">Connecting and preparing...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={knownDevices}
      keyExtractor={(item) => item.keyword}
      contentContainerStyle={{ alignItems: "center", paddingTop: 20 }}
      renderItem={({ item }) => (
        <View className="w-full max-w-sm mb-4 items-center">
          <Text className="text-white font-semibold text-lg mb-2">{item.label}</Text>
          <TouchableOpacity
            className="bg-white/10 border border-white/30 rounded-full py-3 px-8"
            onPress={() => {
              setLoading(true);
              setKeyword(item.keyword);
              setTimeout(() => {
                onConnect(); // na 2.5 sec doorgaan
              }, 2500);
            }}
          >
            <Text className="text-white text-lg font-semibold">Select & Connect</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
