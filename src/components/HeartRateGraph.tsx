import React from "react";
import { View, Text } from "react-native";
import useHeartRateStore from "@/src/store/heartRateStore";

export default function HeartRateGraph() {
  const hrHistory = useHeartRateStore((s) => s.hrHistory);

  if (!hrHistory || hrHistory.length === 0) {
    return <Text style={{ textAlign: "center", color: "gray" }}>No data yet</Text>;
  }

  const maxHR = Math.max(...hrHistory);
  const minHR = Math.min(...hrHistory);

  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end", height: 128, marginTop: 16, paddingHorizontal: 8 }}>
      {hrHistory.map((hr, index) => {
        const height = ((hr - minHR) / (maxHR - minHR || 1)) * 100;

        return (
          <View
            key={index}
            style={{
              width: 3,
              height: `${height}%`,
              backgroundColor: "#06b6d4",
              borderRadius: 9999,
              marginHorizontal: 2,
            }}
          />
        );
      })}
    </View>
  );
}
