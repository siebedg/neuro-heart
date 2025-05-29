import "./global.css";
import { Stack, usePathname, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { auth } from "@/src/firebase/config";
import useAuthStore from "@/src/store/authStore";
import useMockHeartRate from "@/src/hooks/hr/useMockHeartRate";

export default function RootLayout() {
  const setUser = useAuthStore((s) => s.setUser);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const pathname = usePathname();

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user ?? null);
    });
    return unsub;
  }, []);

  // Route protection
  useEffect(() => {
    if (user === undefined) return;

    // Delay router.replace to next tick to avoid native crash
    const timeout = setTimeout(() => {
      if (user === null && pathname !== "/login") {
        router.replace("/login");
      } else if (user !== null && pathname === "/login") {
        router.replace("/");
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [user, pathname]);

  // Hartslagmock wanneer geen wearable
  useMockHeartRate({
    useSmoothing: true,
    baseHeartRate: 130,
  });

  // useEffect(() => {
  //   runDemo();
  // }, []);

  if (user === undefined) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading auth...</Text>
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
