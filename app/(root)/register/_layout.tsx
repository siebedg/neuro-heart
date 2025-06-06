// /app/register/_layout.tsx
import { Stack } from "expo-router";

export default function RegisterLayout() {
  return (
    <Stack
      screenOptions={{
          headerShown: true,
    title: "",
    headerTransparent: true, // ⬅️ geen achtergrond of border
    headerShadowVisible: false, // ⬅️ verwijder onderlijn/border
    headerTintColor: "white", // ⬅️ maak de pijl wit
      }}
    />
  );
}
