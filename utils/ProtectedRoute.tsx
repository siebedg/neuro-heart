import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import useAuthStore from "@/store/authStore";

export default function ProtectedRoute(WrappedComponent: React.ComponentType) {
  return function ProtectedComponent(props: any) {
    const user = useAuthStore((s) => s.user);
    const router = useRouter();
    const rootNavigationState = useRootNavigationState();

    useEffect(() => {
      if (rootNavigationState?.key && user === null) {
        router.replace("/login");
      }
    }, [user, rootNavigationState?.key]);

    if (user === null) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
