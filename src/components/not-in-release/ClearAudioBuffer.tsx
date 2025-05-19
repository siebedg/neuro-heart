import React from "react";
import { View, Button } from "react-native";
import { clearBufferCache } from "../../audio/engine/audioBufferLoader";

const ClearAudioBuffer = () => {
  return (
    <View>
      <Button title="Clear Audio Buffer" onPress={clearBufferCache} />
    </View>
  );
};

export default ClearAudioBuffer;
