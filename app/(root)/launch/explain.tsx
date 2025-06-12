import { useEffect, useRef } from "react";
import { Animated, View, Text, ImageBackground } from "react-native";
import { router, Stack } from "expo-router";

export default function ExplainScreen() {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in on mount
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Auto-navigate after 7s
    const timeout = setTimeout(() => {
      router.push("/launch/moments");
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "",
          headerTransparent: true,
          headerShadowVisible: false,
          headerTintColor: "white", // witte back-arrow
        }}
      />
      <ImageBackground
        source={require("@/assets/images/background.png")}
        resizeMode="cover"
        className="flex-1 px-6 justify-center items-center"
      >
        <Animated.View style={{ opacity }}>
          {/* Visual placeholder */}
          <View className="w-32 h-32 bg-white/10 rounded-full mb-8" />

          <Text className="text-white text-2xl font-bold text-center mb-4">
            Cortune tunes your brain state.
          </Text>
          <Text className="text-gray-300 text-base text-center max-w-xs">
            Through real-time heart rate sync and frequency-driven soundscapes,
            Cortune helps you focus, power up, or recover faster.
          </Text>
        </Animated.View>
      </ImageBackground>
    </>
  );
}
