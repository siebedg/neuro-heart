import { auth } from "@/src/firebase/config";
import useAuthStore from "@/src/store/authStore";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { View, Text, Button } from "react-native";

const handleLogout = async () => {
  try {
    await signOut(auth);
    router.replace("/login");
  } catch (err) {
    console.error("Logout error:", err);
  }
};

const Profile = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-xl">Logged in as:</Text>
      <Text className="text-lg text-cyan-600 mt-2">
        {user?.email ?? "Unknown"}
      </Text>
      <Text> {"\n"}</Text>
      <Button title="Logout" onPress={handleLogout} color="#0891b2" />
    </View>
  );
};

export default Profile;
