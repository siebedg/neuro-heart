import MakeSomeNoise from "@/src/components/MakeSomeNoise";
import TestComponent from "@/src/components/TestComponent";
import React from "react";
import { Text, View } from "react-native";

const Settings = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MakeSomeNoise />
      <TestComponent />
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;
