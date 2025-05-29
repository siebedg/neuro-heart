import { auth } from "@/src/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Link, router } from "expo-router";
import { useGoogleAuth } from "@/src/firebase/google_auth";
import GoogleIcon from "@/src/components/GoogleIcon";

export default function LoginScreen() {
  const { handleGoogleLogin } = useGoogleAuth();

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
    <View className="flex-1 items-center justify-center px-4 bg-white">
      <Text className="text-2xl font-semibold mb-8 text-gray-800">
        Welcome to Cortune
      </Text>
      <TextInput
        className="border border-gray-200 w-full p-4 mb-3 rounded-lg bg-gray-50"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="border border-gray-200 w-full p-4 mb-6 rounded-lg bg-gray-50"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Google Login Button */}
      <TouchableOpacity
        onPress={handleGoogleLogin}
        className="flex-row items-center justify-center w-full py-3 mb-4 bg-white border border-gray-300 rounded-lg"
      >
        <GoogleIcon size={20} />
        <Text className="ml-2 text-sm font-medium text-gray-800">
          Continue with Google
        </Text>
      </TouchableOpacity>

      {/* Regular Login Button */}
      <TouchableOpacity
        onPress={login}
        className="w-full bg-cyan-600 p-4 rounded-lg mb-4"
      >
        <Text className="text-white text-center font-medium">Sign In</Text>
      </TouchableOpacity>

      <Link href="/register/name" className="text-cyan-600 mt-4">
        Don't have an account? Register
      </Link>
    </View>
  );
}
