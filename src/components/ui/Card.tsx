import { View, ViewProps } from "react-native";

export function Card({ children, style, ...props }: ViewProps) {
  return (
    <View
      style={[
        {
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.15)",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

export function CardContent({ children, style, ...props }: ViewProps) {
  return (
    <View style={[{ padding: 16 }, style]} {...props}>
      {children}
    </View>
  );
}
