import { AudioContext } from "react-native-audio-api";
import { log } from "../../utils/log.util";

let audioContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
    if (!audioContext) {
        audioContext = new AudioContext();
        log("✅ AudioContext aangemaakt", "CONTEXT");
    } else {
        log("🔄 Bestaande AudioContext gebruikt", "CONTEXT");
    }
    return audioContext;
}
