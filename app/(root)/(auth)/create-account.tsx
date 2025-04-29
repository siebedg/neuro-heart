import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { Link, router } from "expo-router";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Account created");
      router.replace("/"); // navigates to index.tsx after registration
    } catch (err: any) {
      Alert.alert("Registration error", err.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-4">
      <Text className="text-xl mb-4">Create Account</Text>
      <TextInput
        className="border w-full p-2 mb-2"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="border w-full p-2 mb-4"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Create Account" onPress={register} />
      <Link className="text-blue-500 mt-4" href="/login">
        Already have an account? Log in
      </Link>
    </View>
  );
}
