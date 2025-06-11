import "./global.css";
import { Slot, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/src/firebase/config";
import useAuthStore from "@/src/store/authStore";
import { ImageBackground, StyleSheet } from "react-native";
import useMockHeartRate from "@/src/hooks/hr/useMockHeartRate";

export default function RootLayout() {
  const setUser = useAuthStore((s) => s.setUser);

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsub;
  }, []);

  // Hartslagmock wanneer geen wearable
  useMockHeartRate({
    useSmoothing: true,
    baseHeartRate: 130,
  });

  // useEffect(() => {
  //   runDemo();
  // }, []);
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
  bg: {
    flex: 1,
    resizeMode: "cover",
  },
});
