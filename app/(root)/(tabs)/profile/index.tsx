import { auth } from "@/src/firebase/config";
import { signOut } from "firebase/auth";
import useAuthStore from "@/src/store/authStore";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import { resetOnboarding } from "@/src/utils/onboardingStorage";
import { Ionicons } from "@expo/vector-icons";

const handleLogout = async () => {
  try {
    await signOut(auth);
    router.replace("/login");
  } catch (err: any) {
    Alert.alert("Logout error", err.message);
  }
};

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      className="flex-1 justify-center items-center px-6"
      resizeMode="cover"
    >
      <TouchableOpacity
        onPress={() => router.push("/settings")}
        style={{
          position: "absolute",
          top: 50,
          right: 20,
          zIndex: 10,
        }}
      >
        <Ionicons name="settings-sharp" size={24} color="white" />
      </TouchableOpacity>

      <View className="w-full max-w-sm items-center">
        <TouchableOpacity onPress={() => resetOnboarding()}>
          <Text className="text-red-500 text-[32px] font-bold text-center mb-10">
            Reset
          </Text>
        </TouchableOpacity>
       
        {/* Profile Card */}
        <View className="bg-white/10 rounded-3xl p-6 items-center mb-8 w-full">
          <Image
            source={{
              uri: "https://picsum.photos/id/237/200/300",
            }}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-white text-xl font-semibold">
            {user?.email ?? "Unknown User"}
          </Text>
          <Text className="text-gray-300 mt-1">Joined: Mar 2025</Text>
          <View className="h-[1px] bg-white/20 w-full my-4" />
          <Text className="text-white text-base mb-1">Plan: Free Tier</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-white py-4 rounded-full w-full"
        >
          <Text className="text-black text-center font-semibold text-base">
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
