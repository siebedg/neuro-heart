import React, { useState } from "react";
import { View, Button, Text, ActivityIndicator } from "react-native";
import { useAudioStore } from "../../audio/state/audioStore";
import { preloadZone } from "@/src/audio/engine/audioPreloader";

export default function App() {
  const { play, stop, isPlaying } = useAudioStore();
  const [loading, setLoading] = useState(false);

  const handleSession = async () => {
    setLoading(true);
    const start = Date.now();

    await preloadZone("activation", "tooLow");

    const elapsed = Date.now() - start;
    const minDelay = 2000;
    if (elapsed < minDelay) {
      await new Promise((res) => setTimeout(res, minDelay - elapsed));
    }

    setLoading(false);
    play("activation", "tooLow");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#1A4D2E" />
          <Text style={{ marginTop: 10 }}>Analyzing heart rate…</Text>
        </>
      ) : (
        <Button
          title={isPlaying ? "Stop" : "Start sessie"}
          onPress={isPlaying ? stop : handleSession}
        />
      )}
    </View>
  );
}
