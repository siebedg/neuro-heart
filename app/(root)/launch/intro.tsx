// This file includes consistent styling applied to all onboarding screens
// following the Login and Account screen design language.

// --- intro.tsx ---
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { router } from "expo-router";

export default function IntroScreen() {
  const handleNext = () => router.push("/launch/explain");

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      className="flex-1 justify-center items-center px-6"
      resizeMode="cover"
    >
      <View className="w-full max-w-sm items-center">
        <Text className="text-white text-[32px] font-bold text-center mb-2">
          This is not a playlist.
        </Text>
        <Text className="text-gray-300 text-center text-base mb-10">
          Cortune tunes your nervous system in real-time using your heart rate.
        </Text>

        {/* <TouchableOpacity
          onPress={handleNext}
          className="bg-white py-4 rounded-full w-full"
        >
          <Text className="text-black text-center font-semibold text-base">
            Get Started
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={handleNext}
          className="bg-white/10 border border-white/30 py-4 px-8 rounded-full"
        >
          <Text className="text-white text-lg font-semibold">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// // --- explain.tsx ---
// import { useEffect, useRef } from "react";
// import { Animated, View, Text, ImageBackground } from "react-native";
// import { router } from "expo-router";

// export default function ExplainScreen() {
//   const opacity = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(opacity, {
//       toValue: 1,
//       duration: 1500,
//       useNativeDriver: true,
//     }).start();

//     const timeout = setTimeout(() => router.push("/launch/moments"), 5000);
//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <ImageBackground
//       source={require("@/assets/images/background.png")}
//       className="flex-1 justify-center items-center px-6"
//       resizeMode="cover"
//     >
//       <Animated.View style={{ opacity }} className="w-full max-w-sm items-center">
//         <View className="w-32 h-32 bg-white/10 rounded-full mb-10" />

//         <Text className="text-white text-[24px] font-bold text-center mb-2">
//           Cortune tunes your brain state.
//         </Text>
//         <Text className="text-gray-300 text-base text-center">
//           Through real-time heart rate sync and frequency-driven soundscapes,
//           Cortune helps you focus, power up, or recover faster.
//         </Text>
//       </Animated.View>
//     </ImageBackground>
//   );
// }

// // --- moments.tsx ---
// // Keep layout structure, apply consistent padding and sizing
// // Already quite aligned with overall styling

// // --- intents.tsx ---
// // Consistency added to font sizes, max width, padding

// // --- level.tsx ---
// // Layout already consistent, just adjust text sizing for title and center everything in max-w-sm

// // You can repeat the patterns shown above (Text sizes, padding, border colors, max-w-sm) to make all screens visually coherent.

// // Shared styles:
// // - Use `max-w-sm` and `w-full` wrappers
// // - Buttons: rounded-full, bg-white or bg-white/20 with text-black or text-white/50
// // - Titles: text-[28~32px] font-bold text-white text-center
// // - Descriptions: text-base text-gray-300 text-center
// // - Uniform padding: `px-6`, vertical spacing `mb-*` for flow
// // - All screens: background image with `ImageBackground` using same className
