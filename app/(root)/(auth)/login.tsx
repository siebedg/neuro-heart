import { auth } from "@/src/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { router } from "expo-router";
import { useGoogleAuth } from "@/src/firebase/google_auth";
import GoogleIcon from "@/src/components/ui/GoogleIcon";

export default function LoginScreen() {
  const { handleGoogleLogin } = useGoogleAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in!");
      router.replace("/player");
    } catch (err: any) {
      Alert.alert("Login error", err.message);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      className="flex-1 justify-center items-center px-6"
      resizeMode="cover"
    >
      <View className="w-full max-w-sm">
        <Text className="text-white text-[32px] font-bold text-center mb-1">
          Welcome back
        </Text>
        <Text className="text-gray-300 text-center text-[20px] mb-10">
          Sign in to your Cortune account
        </Text>

        {/* Unified form container */}
        <View className="bg-white/10 rounded-3xl mb-6 overflow-hidden">
          <TextInput
            className="text-white px-4 py-6 text-lg"
            placeholder="Email"
            placeholderTextColor="#bbb"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <View className="h-[2px] bg-[#2e1448]/50" />
          <TextInput
            className="text-white px-4 py-6 text-lg"
            placeholder="Password"
            placeholderTextColor="#bbb"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity className="mb-8">
          <Text className="text-lg text-center text-gray-300">
            Forgot password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={login}
          className="bg-white py-4 rounded-full mb-8"
        >
          <Text className="text-black text-center font-semibold text-base">
            SIGN IN
          </Text>
        </TouchableOpacity>

        {/* OR Divider */}
        <View className="flex-row items-center justify-center mb-6">
          <View className="h-px flex-1 bg-white/20" />
          <Text className="mx-4 text-white/60">OR</Text>
          <View className="h-px flex-1 bg-white/20" />
        </View>

        {/* Full-width social buttons */}
        <View className="space-y-4">
          <TouchableOpacity
            onPress={handleGoogleLogin}
            className="bg-white/10 py-4 rounded-full w-full flex-row justify-center items-center"
          >
            <GoogleIcon size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/register" as any)}>
            <Text className="text-gray-300 mt-6 text-center">
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
