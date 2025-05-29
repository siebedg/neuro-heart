import { Redirect } from "expo-router";
import useAuthStore from "@/src/store/authStore";

export default function Index() {
  const user = useAuthStore((s) => s.user);

  if (user === undefined) return null;

  return user
    ? <Redirect href="/(root)/(tabs)/home" />
    : <Redirect href="/(root)/(auth)/login" />;
}
