import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function RegisterEmailScreen() {
  const [email, setEmail] = useState("");
  const { name } = useLocalSearchParams();

  const handleContinue = () => {
    if (email.trim()) {
      router.push({
        pathname: "/register/password",
        params: { name, email },
      });
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-4">
      <Text className="text-xl mb-4">What's your email?</Text>
      <TextInput
        className="border w-full p-2 mb-4"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button
        title="Continue"
        onPress={handleContinue}
        disabled={!email.trim()}
      />
    </View>
  );
}
