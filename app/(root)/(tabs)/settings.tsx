import ClearAudioBuffer from "@/src/components/not-in-release/ClearAudioBuffer";
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
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
          marginBottom: 20,
          textAlign: "center",
          marginTop: 20,
          marginHorizontal: 20,
          backgroundColor: "teal",
          padding: 10,
          borderRadius: 2,
          fontFamily: "Poppins-Bold",
        }}
      >
        Settings
      </Text>
      <TestComponent />
    </View>
  );
};

export default Settings;
