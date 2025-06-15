import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";

export default function RegisterEmailScreen() {
  const [email, setEmail] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const { name } = useLocalSearchParams<{ name: string }>();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleContinue = async () => {
    if (!email.trim()) return;

    setIsValidating(true);

    try {
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const response = await fetch(
        "https://cortuneresend-login-production.up.railway.app/send-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, verificationCode, name }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to send verification email");
      }

      router.push({
        pathname: "/register/password",
        params: { name, email, verificationCode },
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "Unexpected error";
      Alert.alert("Error", message);
    } finally {
      setIsValidating(false);
    }
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
        <View className="w-full max-w-sm">
          <Text className="text-white text-[32px] font-bold text-center mb-10">
            What is your email?
          </Text>

          {/* Input */}
          <View className="bg-white/10 rounded-2xl mb-6 overflow-hidden">
            <TextInput
              className="text-white px-4 py-4 text-lg"
              placeholder="Enter your email"
              placeholderTextColor="#bbb"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Button */}
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!isValidEmail || isValidating}
            className={`py-4 rounded-full ${
              isValidEmail && !isValidating ? "bg-white" : "bg-white/20"
            }`}
          >
            <Text
              className={`text-center font-semibold text-base ${
                isValidEmail && !isValidating ? "text-black" : "text-white/50"
              }`}
            >
              {isValidating ? "Sending..." : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}
