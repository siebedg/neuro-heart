import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { auth } from "@/src/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterVerifyScreen() {
  const [verificationCode, setVerificationCode] = useState("");
  const { name, email, password, expectedCode } = useLocalSearchParams();

  const handleComplete = async () => {
    try {
      // Verify the code matches
      if (verificationCode !== expectedCode) {
        Alert.alert("Error", "Invalid verification code");
        return;
      }

      // Create Firebase Auth account
      await createUserWithEmailAndPassword(
        auth,
        email as string,
        password as string
      );
      

      Alert.alert("Success", "Account created successfully!");
      router.replace("/");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-4">
      <Text className="text-xl mb-4">Enter verification code</Text>
      <Text className="text-center">
        We've sent a verification code to
      </Text>
      <Text className="text-center mb-4">{email}</Text>
      <TextInput
        className="border w-full p-2 mb-4"
        placeholder="Enter verification code"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="number-pad"
        maxLength={6}
      />
      <Button
        title="Complete Registration"
        onPress={handleComplete}
        disabled={!verificationCode.trim()}
      />
    </View>
  );
}