import { AudioContext } from "react-native-audio-api";

let audioContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
    if (!audioContext) {
        audioContext = new AudioContext();
        console.log("✅ AudioContext aangemaakt");
    } else {
        console.log("🔄 Bestaande AudioContext gebruikt");
    }
    return audioContext;
}
