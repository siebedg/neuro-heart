// src/app/(root)/(tabs)/player/index.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Easing,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { BleManager, State } from "react-native-ble-plx";

import useHeartRateStore from "@/src/store/heartRateStore";
import useOnboardingStore from "@/src/store/onboardingStore";
import { useAudioStore } from "@/src/audio/store/audioStore";
import { preloadZone } from "@/src/audio/engine/audioPreloader";
import useSettingsStore from "@/src/store/settingsStore";
import DeviceSelector from "@/src/components/player/DeviceSelector";
import BluetoothPrompt from "@/src/components/player/BluetoothPrompt";
import { useRouter } from "expo-router";

export default function PlayerScreen() {
  const hr = useHeartRateStore((s) => s.hr || 97);
  const current = useHeartRateStore((s) => s.currentHeartRateData);
  const { play, stop, isPlaying } = useAudioStore();
  const { useCase, intent } = useOnboardingStore();

  const { useMockHR } = useSettingsStore();
  const [connected, setConnected] = useState(false);

  const [autoRunning, setAutoRunning] = useState(false);
  const pulse = useRef(new Animated.Value(1)).current;
  const lastZone = useRef<string | null>(null);
  const lastState = useRef<string | null>(null);

  const manager = useRef(new BleManager()).current;
  const [bleState, setBleState] = useState<State | null>(null);

  const router = useRouter();

  const handleConnect = async () => {
    // Wacht even tot useBLEHeartRate actief wordt na setKeyword
    await new Promise((r) => setTimeout(r, 1000));
    setConnected(true);

    // Optioneel: navigatie zodra ready (indien je naar andere screen wilt)
    // router.push("/player/connected"); // indien je aparte route hebt
  };

  // Monitor Bluetooth state
  useEffect(() => {
    const sub = manager.onStateChange((state) => {
      setBleState(state);
    }, true);
    return () => sub.remove();
  }, [manager]);

  // Pulse animation
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
  }, [pulse]);

  // Auto session on zone change
  useEffect(() => {
    if (!autoRunning || !current) return;
    const { zone, state } = current.zone;
    if (zone !== lastZone.current || state !== lastState.current) {
      lastZone.current = zone;
      lastState.current = state;
      (async () => {
        await preloadZone(zone, state);
        play(zone, state);
      })();
    }
  }, [current, autoRunning]);

  const startSession = async () => {
    if (!current) {
      Alert.alert("⚠️ Geen hartslagdata", "Wacht op signaal van de HR-band.");
      return;
    }
    const { zone, state } = current.zone;
    await preloadZone(zone, state);
    lastZone.current = zone;
    lastState.current = state;
    play(zone, state);
    setAutoRunning(true);
  };

  const stopSession = () => {
    stop();
    setAutoRunning(false);
  };

  const zoneMsg = hr < 100 ? "Zone too low to engage" : "Ready to focus";
  const intentMsg = {
    power: "Primed for intensity",
    focus: "Tuned for deep concentration",
    recovery: "Set for nervous system reset",
  }[intent || ""];
  const caseMsg = {
    running: "during your run",
    recovery: "post-workout recovery",
    boost: "for your next performance push",
  }[useCase || ""];

  // If in mock mode, show mock UI
  if (useMockHR) {
    return (
      <ImageBackground
        source={require("@/assets/images/background.png")}
        className="flex-1 justify-center items-center px-6"
        resizeMode="cover"
      >
        <Text className="text-yellow-300 mb-12">Mock Heart Rate Active</Text>
        <View className="items-center mb-10">
          <Animated.View
            style={{ transform: [{ scale: pulse }] }}
            className="w-56 h-56 rounded-full border-4 border-white/30 justify-center items-center mb-4 bg-white/10"
          >
            <Text className="text-white text-5xl font-bold">{hr}</Text>
            <FontAwesome
              name="heart"
              size={28}
              color="#EF4444"
              style={{ marginTop: 4 }}
            />
            <Text className="text-white/60 text-base">BPM</Text>
          </Animated.View>
          <Text className="text-white text-lg font-semibold text-center mt-2">
            {zoneMsg}
          </Text>
        </View>
        <View className="bg-white/10 rounded-xl p-4 mb-6 w-full max-w-sm">
          <Text className="text-white text-base mb-1">Personalized Tune</Text>
          <Text className="text-white/70">
            {intentMsg}
            {caseMsg ? ` — optimal ${caseMsg}` : ""}
          </Text>
        </View>
        <TouchableOpacity
          className="bg-white/10 border border-white/30 rounded-full py-4 px-10"
          onPress={isPlaying ? stopSession : startSession}
        >
          <Text className="text-white text-lg font-semibold">
            {isPlaying ? "Stop Session" : "Start Session"}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  // If Bluetooth off, prompt user
  if (bleState !== State.PoweredOn) {
    return <BluetoothPrompt />;
  }

  // BLE mode: show selector until connected
  if (!connected) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <DeviceSelector onConnect={handleConnect} />{" "}
      </View>
    );
  }

  // When connected
  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      className="flex-1 justify-center items-center px-6"
      resizeMode="cover"
    >
      <TouchableOpacity
        className="bg-white/10 border border-white/30 rounded-full py-4 px-10 mb-6"
        onPress={isPlaying ? stopSession : startSession}
      >
        <Text className="text-white text-lg font-semibold">
          {isPlaying ? "Stop Session" : "Start Session"}
        </Text>
      </TouchableOpacity>
      <View className="items-center mb-10">
        <Animated.View
          style={{
            transform: [{ scale: pulse }],
            backgroundColor:
              hr >= 120 ? "rgba(0,0,30,0.15)" : "rgba(255,255,255,0.08)",
          }}
          className="w-56 h-56 rounded-full border-4 border-white/30 justify-center items-center mb-4"
        >
          <Text className="text-white text-5xl font-bold">{hr}</Text>
          <FontAwesome
            name="heart"
            size={28}
            color="#EF4444"
            style={{ marginTop: 4 }}
          />
          <Text className="text-white/60 text-base">BPM</Text>
        </Animated.View>
        <Text className="text-white text-lg font-semibold text-center mb-1 mt-4">
          {zoneMsg}
        </Text>
      </View>
      <View className="bg-white/10 rounded-xl p-4 mb-6 w-full max-w-sm">
        <Text className="text-white text-base mb-1">Personalized Tune</Text>
        <Text className="text-white/70">
          {intentMsg}
          {caseMsg ? ` — optimal ${caseMsg}` : ""}
        </Text>
      </View>
    </ImageBackground>
  );
}
