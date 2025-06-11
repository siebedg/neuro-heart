import { Stack } from "expo-router";

export default function RegisterLayout() {
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
