import { loadAudioBuffer } from "./audioBufferLoader";
import { getAudioContext } from "./audioContext";
import { AudioBuffer, AudioBufferSourceNode } from "react-native-audio-api";
import audioPresets from "../presets/audioPresets";
import { Zone, HRState, PresetStructure } from "../types/audioPresets";

let currentSource: AudioBufferSourceNode | null = null;
let currentPresetId: string | null = null;


export async function playPreset(zone: Zone, state: HRState) {
  try {
    const moodPresets = audioPresets[zone]?.[state];
    if (!moodPresets || moodPresets.length === 0) {
        console.error(`No presets found for zone "${zone}" and state "${state}"`);
        return;
    }

    const preset = moodPresets[Math.floor(Math.random() * moodPresets.length)];
    // const url = preset.loopUrls[0]; // Later hier op bpm filteren
    const url = "https://software-mansion.github.io/react-native-audio-api/audio/music/example-music-01.mp3";
    console.log(`🎵 Spelen van preset: ${preset.id} (${url})`);

    const audioBuffer = await loadAudioBuffer(url);
    const audioContext = getAudioContext();

    // Stop the current buffer if it's playing
    if (currentSource) {
      currentSource.stop();
      currentSource.disconnect();
      console.log("Current buffer stopped");
    }

    // Create a new AudioBufferSourceNode
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer as AudioBuffer;
    source.connect(audioContext.destination);
    source.start();

    // Save the current node for later stopping
    currentSource = source;
    currentPresetId = preset.id;
    console.log(`Started playing: ${url}`);
  } catch (error) {
    console.error("Error playing audio:", error);
  }
}

export function stopPreset() {
  if (currentSource) {
    currentSource.stop();
    currentSource.disconnect();
    currentSource = null;
    currentPresetId = null;
    console.log("Buffer stopped");
  }
}
