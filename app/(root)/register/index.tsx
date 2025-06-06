// /app/register/index.tsx
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { router } from "expo-router";

export default function RegisterIndex() {
  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      className="flex-1 justify-center items-center px-6"
      resizeMode="cover"
    >
      <View className="w-full max-w-sm">
        <Text className="text-white text-[32px] font-bold text-center mb-1">
          Let's get started
        </Text>
        <Text className="text-gray-300 text-center text-[20px] mb-10">
          Create your Cortune account
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/register/name")}
          className="bg-white py-4 rounded-full mb-6"
        >
          <Text className="text-black text-center font-semibold text-base">
            START REGISTRATION
          </Text>
        </TouchableOpacity>

        {/* OR Divider */}
        <View className="flex-row items-center justify-center mb-6">
          <View className="h-px flex-1 bg-white/20" />
          <Text className="mx-4 text-white/60">OR</Text>
          <View className="h-px flex-1 bg-white/20" />
        </View>

        <TouchableOpacity
          onPress={() => router.push("/login")}
          className="bg-white/10 py-4 rounded-full w-full"
        >
          <Text className="text-white text-center font-semibold text-base">
            BACK TO LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
