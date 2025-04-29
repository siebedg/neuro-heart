import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { Link, router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in!");
      router.replace("/"); // instantly navigates to index.tsx
    } catch (err: any) {
      Alert.alert("Login error", err.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-4">
      <Text className="text-xl mb-4">Login</Text>
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
      <Button title="Login" onPress={login} />
      <Link href="/create-account" className="text-blue-500 mt-4">
        Don't have an account? Register
      </Link>
    </View>
  );
}
