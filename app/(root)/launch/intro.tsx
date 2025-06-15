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
        <Text className="text-white text-[32px] font-bold text-center mb-6">
          This is not a playlist.
        </Text>
        <Text className="text-gray-300 text-center text-lg mb-10">
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