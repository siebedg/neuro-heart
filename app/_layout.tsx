import "./global.css";
import { Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/src/firebase/config";
import useAuthStore from "@/src/store/authStore";
// import useMockHeartRate from "@/src/hooks/hr/useMockHeartRate";

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
  // useMockHeartRate({
  //   useSmoothing: true,
  //   baseHeartRate: 130,
  // });

  // useEffect(() => {
  //   runDemo();
  // }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
