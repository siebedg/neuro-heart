import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function RegisterPasswordScreen() {
  const [password, setPassword] = useState("");
  const { name, email, verificationCode } = useLocalSearchParams();

  const isValidPassword = password.trim().length >= 8;

  const handleContinue = () => {
    if (password.trim()) {
      router.push({
        pathname: "/register/verify",
        params: { name, email, password, expectedCode: verificationCode },
      });
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-4">
      <Text className="text-xl mb-4">Create a password</Text>
      <TextInput
        className="border w-full p-2 mb-4"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Continue"
        onPress={handleContinue}
        disabled={!password.trim() || !isValidPassword}
      />
      {!isValidPassword && password.length > 0 && (
        <Text style={{ color: "red" }}>
          Password must be at least 8 characters
        </Text>
      )}
    </View>
  );
}
