import React, { useState } from "react";
import { View, Button, Text, ActivityIndicator, Alert } from "react-native";
import { useAudioStore } from "../../audio/store/audioStore";
import { preloadZone } from "@/src/audio/engine/audioPreloader";
import useBLEHeartRate from "@/src/hooks/hr/useBLEHeartRate";
import useHeartRateStore from "@/src/store/heartRateStore";
import { Device } from "react-native-ble-plx";
import SelectHRDevice from "../SelectDevice";

export default function App() {
  useBLEHeartRate();

  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const { currentHeartRateData } = useHeartRateStore();
  const { play, stop, isPlaying } = useAudioStore();
  const [loading, setLoading] = useState(false);

  // Handle session
  const handleSession = async () => {
    setLoading(true);
    const start = Date.now();

    const { currentHeartRateData } = useHeartRateStore.getState();
    if (currentHeartRateData) {
      const { zone, state } = currentHeartRateData.zone;

      await preloadZone(zone, state);

      const elapsed = Date.now() - start;
      const minDelay = 2000;
      if (elapsed < minDelay) {
        await new Promise((res) => setTimeout(res, minDelay - elapsed));
      }

      setLoading(false);
      play(zone, state);
    } else {
      setLoading(false);
      Alert.alert(
        "⚠️ Geen hartslagdata",
        "Wacht tot de sensor iets binnenkrijgt."
      );
    }
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
      {currentHeartRateData && (
        <Text style={{ marginTop: 20 }}>
          Zone: {currentHeartRateData.zone.zone} | Mood:{" "}
          {currentHeartRateData.zone.state}
        </Text>
      )}

      {!selectedDevice ? (
        <SelectHRDevice
          onSelect={(device) => {
            setSelectedDevice(device);
            // connecteer of geef door aan je BLE hook
          }}
        />
      ) : (
        <></>
      )}
    </View>
  );
}
