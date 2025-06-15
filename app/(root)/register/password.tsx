import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";

export default function RegisterPasswordScreen() {
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowError(password.length > 0 && !isValidPassword);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeout);
  }, [password]);

  const { name, email, verificationCode } = useLocalSearchParams<{
    name: string;
    email: string;
    verificationCode: string;
  }>();

  const isValidPassword = password.trim().length >= 8;

  const handleContinue = () => {
    if (isValidPassword) {
      router.push({
        pathname: "/register/verify",
        params: {
          name,
          email,
          password,
          expectedCode: verificationCode,
        },
      });
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
            Create a password
          </Text>

          {/* Input */}
          <View className="bg-white/10 rounded-2xl mb-6 overflow-hidden">
            <TextInput
              className="text-white px-4 py-4 text-lg"
              placeholder="Enter your password"
              placeholderTextColor="#bbb"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          {/* Button */}
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!isValidPassword}
            className={`py-4 rounded-full mb-2 ${
              isValidPassword ? "bg-white" : "bg-white/20"
            }`}
          >
            <Text
              className={`text-center font-semibold text-base ${
                isValidPassword ? "text-black" : "text-white/50"
              }`}
            >
              Continue
            </Text>
          </TouchableOpacity>
          {/* Inline error */}
          {!isValidPassword && password.length > 0 && showError && (
            <Text className="text-red-400 mb-4 text-sm text-center">
              Password must be at least 8 characters
            </Text>
          )}
        </View>
      </ImageBackground>
    </>
  );
}
