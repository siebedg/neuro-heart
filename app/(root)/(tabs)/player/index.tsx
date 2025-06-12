// PlayerScreen.tsx
import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Animated, Easing, Alert } from "react-native";
import useHeartRateStore from "@/src/store/heartRateStore";
import useOnboardingStore from "@/src/store/onboardingStore";
import { useAudioStore } from "@/src/audio/store/audioStore";
import { preloadZone } from "@/src/audio/engine/audioPreloader";
import { FontAwesome } from "@expo/vector-icons";
import DeviceSelector from "@/src/components/DeviceSelector";

export default function PlayerScreen() {
  const hr = useHeartRateStore((s) => s.hr || 97);
  const currentHeartRateData = useHeartRateStore((s) => s.currentHeartRateData);
  const { play, stop, isPlaying } = useAudioStore();
  const { useCase, intent } = useOnboardingStore();

  const [pulse] = useState(new Animated.Value(1));
  const [autoRunning, setAutoRunning] = useState(false);
  const [deviceConnected, setDeviceConnected] = useState(false);
  const lastZoneRef = useRef<string | null>(null);
  const lastStateRef = useRef<string | null>(null);

  const zoneMessage = hr < 100 ? "Zone too low to engage" : "Ready to focus";
  const intentText = {
    power: "Primed for intensity",
    focus: "Tuned for deep concentration",
    recovery: "Set for nervous system reset",
  }[intent || ""];

  const useCaseText = {
    running: "during your run",
    recovery: "post-workout recovery",
    boost: "for your next performance push",
  }[useCase || ""];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.05,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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
    if (!currentHeartRateData) {
      Alert.alert("⚠️ Geen hartslagdata", "Wacht op signaal van de HR-band.");
      return;
    }
    const { zone, state } = currentHeartRateData.zone;
    await preloadZone(zone, state);
    lastZoneRef.current = zone;
    lastStateRef.current = state;
    play(zone, state);
    setAutoRunning(true);
  };

  const stopAutoSession = () => {
    setAutoRunning(false);
    stop();
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      className="flex-1 justify-center items-center px-6"
      resizeMode="cover"
    >
      <DeviceSelector
        onStart={startAutoSession}
        onStop={stopAutoSession}
        isPlaying={isPlaying}
        currentHeartRateData={currentHeartRateData}
        onConnect={() => setDeviceConnected(true)}
      />

      {deviceConnected && (
        <>
          <View className="items-center mb-10">
            <Animated.View
              style={{
                transform: [{ scale: pulse }],
                backgroundColor: hr >= 120 ? "rgba(0,0,30,0.15)" : "rgba(255,255,255,0.08)",
              }}
              className="w-56 h-56 rounded-full border-4 border-white/30 justify-center items-center mb-4"
            >
              <Text className="text-white text-5xl font-bold">{hr}</Text>
              <FontAwesome name="heart" size={28} color="#EF4444" style={{ marginTop: 4 }} />
              <Text className="text-white/60 text-base">BPM</Text>
            </Animated.View>
            <Text className="text-white text-lg font-semibold text-center mb-1 mt-4">{zoneMessage}</Text>
          </View>

          <View className="bg-white/10 rounded-xl p-4 mb-6 w-full max-w-sm">
            <Text className="text-white text-base mb-1">Personalized Tune</Text>
            <Text className="text-white/70">{intentText} {useCaseText ? `— optimal ${useCaseText}` : ""}</Text>
          </View>
        </>
      )}
    </ImageBackground>
  );
}
