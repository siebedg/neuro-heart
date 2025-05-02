import { auth } from "@/firebase/config";
// import useProtectedRoute from "@/hooks/useProtectedRoute";
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
      <Text> {"\n"}</Text>
      <Button title="Logout" onPress={handleLogout} color="#0891b2" />
    </View>
  );
};

export default Profile;
