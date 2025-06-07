import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { router } from "expo-router";

export default function IntroScreen() {
  const handleNext = () => {
    router.push("/launch/explain");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      className="flex-1 justify-center items-center px-6"
      resizeMode="cover"
    >
      <View className="items-center">
        <Text className="text-white text-3xl font-bold mb-4">
          This is not a playlist.
        </Text>
        <Text className="text-gray-300 text-center text-lg mb-8">
          Cortune tunes your nervous system in real-time using your heart rate.
        </Text>

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
