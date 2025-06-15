import React, { useEffect, useRef, useState } from "react";
import { View, Button, Text, ActivityIndicator, Alert } from "react-native";
import { useAudioStore } from "@/src/audio/store/audioStore";
import useHeartRateStore from "@/src/store/heartRateStore";
import { preloadZone } from "@/src/audio/engine/audioPreloader";

export default function AudioSessionController() {
  const { currentHeartRateData } = useHeartRateStore();
  const { play, stop, isPlaying } = useAudioStore();
  const [loading, setLoading] = useState(false);
  const lastZoneRef = useRef<string | null>(null);
  const lastStateRef = useRef<string | null>(null);

  const [autoRunning, setAutoRunning] = useState(false);

  useEffect(() => {
    if (!autoRunning || !currentHeartRateData) return;

    const { zone, state } = currentHeartRateData.zone;

    const zoneChanged = zone !== lastZoneRef.current || state !== lastStateRef.current;

    if (zoneChanged) {
      lastZoneRef.current = zone;
      lastStateRef.current = state;

      (async () => {
        await preloadZone(zone, state);
        play(zone, state);
      })();
    }
  }, [currentHeartRateData, autoRunning]);

  const startAutoSession = async () => {
    const { currentHeartRateData } = useHeartRateStore.getState();
    if (!currentHeartRateData) {
      Alert.alert("⚠️ Geen hartslagdata", "Wacht op signaal van de HR-band.");
      return;
    }

    const { zone, state } = currentHeartRateData.zone;
    setLoading(true);
    await preloadZone(zone, state);
    setLoading(false);

    lastZoneRef.current = zone;
    lastStateRef.current = state;

    play(zone, state);
    setAutoRunning(true); // Trigger automatische updates
  };

  const stopAutoSession = () => {
    setAutoRunning(false);
    stop();
  };

  return (
    <View style={{ marginVertical: 20 }}>
      {loading ? (
        <>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10 }}>Analyzing heart rate…</Text>
        </>
      ) : (
        <Button
          title={isPlaying ? "Stop sessie" : "Start sessie"}
          onPress={isPlaying ? stopAutoSession : startAutoSession}
        />
      )}
      {currentHeartRateData && (
        <Text style={{ marginTop: 20 }}>
          Zone: {currentHeartRateData.zone.zone} | Mood: {currentHeartRateData.zone.state}
        </Text>
      )}
    </View>
  );
}
