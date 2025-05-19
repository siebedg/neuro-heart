import React from "react";
// import React, { useEffect } from "react";
import { View, Button, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { useAudioStore } from "../../audio/state/audioStore";
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
        title={
          isPlaying ? "Stop" : "Play"
        }
        onPress={() => (isPlaying ? stop() : play("activation", "tooLow"))}
      />
    </View>
  );
}
