import MakeSomeNoise from "@/src/components/MakeSomeNoise";
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
      <MakeSomeNoise />
    </View>
  );
};

export default Settings;
