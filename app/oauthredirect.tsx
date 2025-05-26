import { useEffect } from "react";
import { router } from "expo-router";

export default function OAuthRedirect() {
  useEffect(() => {
    router.replace("/");
  }, []);

  return null;
}
