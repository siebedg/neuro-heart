import { useEffect, useRef } from "react";
import { Animated, View, Text, ImageBackground } from "react-native";
import { router, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function ExplainScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Auto-navigate after 5s
    const timeout = setTimeout(() => {
      router.push("/launch/moments");
    }, 10000);

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
          headerTintColor: "white",
        }}
      />
      <ImageBackground
        source={require("@/assets/images/background.png")}
        resizeMode="cover"
        className="flex-1 px-6 justify-center items-center"
      >
        <Animated.View style={{ opacity }} className="items-center">
          <Animated.View
            style={{ transform: [{ scale: pulse }] }}
            className="w-36 h-36 bg-white/10 rounded-full mb-6 border border-white/20 items-center justify-center"
          >
            <FontAwesome name="heart" size={32} color="white" />
          </Animated.View>

          <Text className="text-white text-[22px] font-bold text-center mb-3">
            Your body. Your beat. Your flow.
          </Text>

          <Text className="text-gray-300 text-center text-base max-w-xs">
            Cortune syncs music to your heart rate in real time — boosting
            focus, energy, or recovery.
          </Text>

          <Text className="text-white/50 text-center text-sm mt-4 max-w-xs">
            Heart rate entrainment • Custom adaptive tracks • Mood & fatigue
            detection
          </Text>
        </Animated.View>
      </ImageBackground>
    </>
  );
}
