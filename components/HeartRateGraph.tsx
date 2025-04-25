import React from "react";
import { View, Text } from "react-native";
import useHeartRateStore from "@/store/heartRateStore";

export default function HeartRateGraph() {
  const hrHistory = useHeartRateStore((s) => s.hrHistory);

  if (hrHistory.length === 0) {
    return <Text className="text-center text-gray-500">No data yet</Text>;
  }

  const maxHR = Math.max(...hrHistory);
  const minHR = Math.min(...hrHistory);

  return (
    <View className="flex-row items-end h-32 mt-4 space-x-1 px-2">
      {hrHistory.map((hr, index) => {
        const height = ((hr - minHR) / (maxHR - minHR || 1)) * 100;

        return (
          <View
            key={index}
            style={{ height: `${height}%` }}
            className="w-[3px] bg-cyan-600 rounded-full"
          />
        );
      })}
    </View>
  );
}
