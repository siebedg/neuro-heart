import { Stack } from "expo-router";

export default function LaunchLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "",
        headerTransparent: true,
        headerShadowVisible: false,
        headerTintColor: "white",
      }}
    />
  );
}
