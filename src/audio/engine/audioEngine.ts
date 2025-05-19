import { loadAudioBuffer } from "./audioBufferLoader";
import { getAudioContext } from "./audioContext";
import { AudioBuffer, AudioBufferSourceNode } from "react-native-audio-api";
import audioPresets from "../presets/audioPresets";
import { Zone, HRState } from "../types/audioPresets";
import { errorLog, log } from "../../utils/log.util";

let currentSource: AudioBufferSourceNode | null = null;
let currentPresetId: string | null = null;

export async function playPreset(zone: Zone, state: HRState) {
  try {
    const moodPresets = audioPresets[zone]?.[state];
    if (!moodPresets || moodPresets.length === 0) {
      errorLog(
        `No presets found for zone "${zone}" and state "${state}"`,
        "PRESET"
      );
      return;
    }

    const preset = moodPresets[Math.floor(Math.random() * moodPresets.length)];
    // const url = preset.loopUrls[0]; // Later hier op bpm filteren
    const url =
      "https://software-mansion.github.io/react-native-audio-api/audio/music/example-music-01.mp3";
    log(`Playing preset: ${preset.id} (${url})`, "AUDIO");

    const audioBuffer = await loadAudioBuffer(url);
    const audioContext = getAudioContext();

    // Stop the current buffer if it's playing
    if (currentSource) {
      currentSource.stop();
      currentSource.disconnect();
      log("Current buffer stopped", "AUDIO");
    }

    // Create a new AudioBufferSourceNode
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer as AudioBuffer;
    source.connect(audioContext.destination);
    source.start();

    // Save the current node for later stopping
    currentSource = source;
    currentPresetId = preset.id;
    log(`Started playing: ${url}`, "AUDIO");
  } catch (error) {
    errorLog(`Error playing audio: ${error}`, "AUDIO");
  }
}

export function stopPreset() {
  if (currentSource) {
    currentSource.stop();
    currentSource.disconnect();
    currentSource = null;
    currentPresetId = null;
    log("Buffer stopped", "AUDIO");
  }
}
