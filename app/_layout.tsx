import "./global.css";
import { Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/src/firebase/config";
import useAuthStore from "@/src/store/authStore";
import { useRouter } from "expo-router";
import useMockHeartRate from "@/src/hooks/hr/useMockHeartRate";
// import { runDemo } from "@/src/utils/hr/hrDemo";

export default function RootLayout() {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        router.replace("/login");
      }
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

  if (loading) return null; // or splash

  return <Stack screenOptions={{ headerShown: false }} />;
}
