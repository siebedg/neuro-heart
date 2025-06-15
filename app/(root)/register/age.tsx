import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import useOnboardingStore from "@/src/store/onboardingStore";

export default function RegisterAgeScreen() {
  const [age, setAge] = useState("");
  const { name } = useLocalSearchParams<{ name: string }>();
  const onboarding = useOnboardingStore();

  const numericAge = parseInt(age);
  const isValidAge = !isNaN(numericAge) && numericAge >= 10 && numericAge <= 100;

  const handleContinue = () => {
    onboarding.setName(name || "User");
    onboarding.setAge(numericAge);
    router.push("/register/email");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerTransparent: true,
          headerShadowVisible: false,
          headerTintColor: "white",
        }}
      />

      <ImageBackground
        source={require("@/assets/images/background.png")}
        className="flex-1 justify-center items-center px-6"
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="w-full max-w-sm"
        >
          <Text className="text-white text-[32px] font-bold text-center mb-4">
            How old are you?
          </Text>
          <Text className="text-white text-center text-base mb-10">
            This helps us personalize your heart rate zones for optimal guidance.
          </Text>

          <View className="bg-white/10 rounded-2xl mb-6 overflow-hidden">
            <TextInput
              className="text-white px-4 py-4 text-lg"
              placeholder="Enter your age"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
          </View>

          <TouchableOpacity
            onPress={handleContinue}
            disabled={!isValidAge}
            className={`py-4 rounded-full ${
              isValidAge ? "bg-white" : "bg-white/20"
            }`}
          >
            <Text
              className={`text-center font-semibold text-base ${
                isValidAge ? "text-black" : "text-white/50"
              }`}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
}
