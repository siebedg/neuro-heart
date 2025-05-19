import React, { useEffect } from "react";
import { View, Button } from "react-native";
import { preloadAllPresets } from "../../audio/engine/audioPreloader";
// import { playPreset, stopPreset } from "../audio/audioEngine";
import { useAudioStore } from "../../audio/store/audioStore";


export default function App() {
    const { play, stop, isPlaying } = useAudioStore();

    useEffect(() => {
        // Preload all presets on app launch
        preloadAllPresets();
    }, []);
 
    return (
        // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        //     <Text>🎧 Testing Audio Preloader</Text>
        //     <Button title="▶️ Play Activation Too Low" onPress={() => playPreset("activation", "tooLow")} />
        //     <Button title="🛑 Stop" onPress={stopPreset}/>
        // </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title={isPlaying ? "Stop" : "Play Activation op MAAANDDAAAGGG (Too Low)"}
        onPress={() =>
          isPlaying ? stop() : play("activation", "tooLow")
        }
      />
    </View>
    );
}
