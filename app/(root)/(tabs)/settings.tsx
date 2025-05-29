import TestComponent from "@/src/components/not-in-release/TestComponent";
import React from "react";
import { Button, Text, View } from "react-native";

const Settings = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TestComponent />
    </View>
  );
};

export default Settings;
