import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import useAuthStore from "@/src/store/authStore";
import { hasSeenOnboarding } from "@/src/utils/onboardingStorage";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const user = useAuthStore((s) => s.user);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const check = async () => {
      if (user === undefined) return; 

      if (user) {
        setInitialRoute("/(root)/(tabs)/home");
      } else {
        const seen = await hasSeenOnboarding();
        setInitialRoute(seen ? "/(root)/(auth)/login" : "/launch/intro");
      }
    };

    check();
  }, [user]);

  if (!initialRoute) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={initialRoute as any} />;
}
