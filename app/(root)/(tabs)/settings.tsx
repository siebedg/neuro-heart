import { playSound } from "@/src/audio/simpleAudioPlayer";
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
      {/* <Button
        title="Play Sound"
        onPress={() =>
          playSound(
            require("../../../assets/audio/activation/Activation_TooLow_140BPM_440Hz.wav")
          )
        }
      /> */}
      <TestComponent />
      <ClearAudioBuffer />
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;
