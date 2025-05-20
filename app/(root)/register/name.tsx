import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { router } from "expo-router";

export default function RegisterNameScreen() {
  const [name, setName] = useState("");

  const isValidName = name.trim().length >= 2;

  const handleContinue = () => {
    if (name.trim()) {
      router.push({
        pathname: "/register/email",
        params: { name },
      });
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-4">
      <Text className="text-xl mb-4">What's your name?</Text>
      <TextInput
        className="border w-full p-2 mb-4"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button
        title="Continue"
        onPress={handleContinue}
        disabled={!isValidName}
      />
    </View>
  );
}
