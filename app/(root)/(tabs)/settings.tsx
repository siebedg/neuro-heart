import React from "react";
import { View, Text } from "react-native";

const Settings = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-3xl text-cyan-600 text-center">Settings</Text>
    </View>
  );
};

export default Settings;
