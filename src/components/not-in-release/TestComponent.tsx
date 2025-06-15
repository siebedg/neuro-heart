import React, { useState } from "react";
import { View } from "react-native";
import useBLEHeartRate from "@/src/hooks/hr/useBLEHeartRate";
import SelectHRDevice from "../player/SelectHRDevice";
import AudioSessionController from "../player/AudioSessionController";

export default function TestComponent() {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  useBLEHeartRate(selectedKeyword ?? "");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!selectedKeyword ? (
        <SelectHRDevice onSelect={(keyword) => setSelectedKeyword(keyword)} />
      ) : (
        <AudioSessionController />
      )}
    </View>
  );
}
