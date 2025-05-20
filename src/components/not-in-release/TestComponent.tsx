import React from "react";
// import React, { useEffect } from "react";
import { View, Button, Text } from "react-native";
import { useAudioStore } from "../../audio/state/audioStore";
import { getRandomPreset } from "@/src/audio/presets/presetUtils";
// import { preloadAllPresets } from "../../audio/engine/audioPreloader";

export default function App() {
  const { play, stop, isPlaying } = useAudioStore();

  // useEffect(() => {
  //     // Preload all presets on app launch
  //     preloadAllPresets();
  // }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title={isPlaying ? "Stop" : "Play"}
        onPress={() => (isPlaying ? stop() : play("activation", "tooLow"))}
      />
      <Button
        title="Get random preset"
        onPress={() => getRandomPreset("activation", "tooLow")}
      />
      <Button
        title="Get random preset 155"
        onPress={() => getRandomPreset("activation", "tooLow", [155, 200])}
      />
    </View>
  );
}
