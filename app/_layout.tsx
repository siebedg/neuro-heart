import "./global.css";
import { Slot } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/src/firebase/config";
import useAuthStore from "@/src/store/authStore";
import { ImageBackground, StyleSheet } from "react-native";

import useMockHeartRate from "@/src/hooks/hr/useMockHeartRate";
import useBLEHeartRate from "@/src/hooks/hr/useBLEHeartRate";
import useSettingsStore from "@/src/store/settingsStore";

export default function RootLayout() {
  const setUser = useAuthStore((s) => s.setUser);
  const { useMockHR, selectedDeviceKeyword } = useSettingsStore();

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));
    return unsub;
  }, []);

  // 1) Mock flow when toggled on
  useMockHeartRate({ useSmoothing: true, baseHeartRate: 130 }, useMockHR);

  // 2) BLE flow only when mock is off
  useBLEHeartRate(selectedDeviceKeyword, !useMockHR);

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.bg}
    >
      <Slot screenOptions={{ headerShown: false }} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, resizeMode: "cover" },
});
