import { auth } from "@/app/firebase/config";
import ProtectedRoute from "@/app/utils/ProtectedRoute";
import { signOut } from "firebase/auth";
import React from "react";
import { View, Text, Button } from "react-native";

const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Logout error:", err);
  }
};

const Profile = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-3xl text-cyan-800 text-center">
        siebe.de.gelas@gmail.com
      </Text>
      <Text> {"\n"}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProtectedRoute(Profile);
