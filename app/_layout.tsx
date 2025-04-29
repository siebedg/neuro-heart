// import './firebase/appcheck_init'; // Wacht met App Check tot de native SDK (of dev client) gebruikt wordt
import "./global.css";
import { Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import useAuthStore from "@/store/authStore";
import { useRouter } from "expo-router";
import useMockHeartRate from "@/hooks/useMockHeartRate";

export default function RootLayout() {
  useMockHeartRate();

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

  if (loading) return null; // or splash

  return <Stack screenOptions={{ headerShown: false }} />;
  // return <Stack />;
}