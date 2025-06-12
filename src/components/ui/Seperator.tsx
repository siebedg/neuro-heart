import { View } from "react-native";

export function Separator({ className }: { className?: string }) {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: "rgba(255,255,255,0.2)",
        marginVertical: 24,
      }}
    />
  );
}
