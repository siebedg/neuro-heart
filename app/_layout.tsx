import "./global.css";
import { Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase/config";
import useAuthStore from "@/app/store/authStore";
import { useRouter } from "expo-router";

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

  if (loading) return null; // or splash

  return <Stack />;
}