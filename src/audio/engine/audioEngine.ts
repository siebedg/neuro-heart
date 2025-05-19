import { loadAudioBuffer } from "./audioBufferLoader";
import { getAudioContext } from "./audioContext";
import { AudioBuffer, AudioBufferSourceNode } from "react-native-audio-api";
import { Zone, HRState } from "../types/audioPresets";
import { errorLog, log } from "../../utils/log.util";
import { getRandomPreset } from "../presets/presetUtils";

let currentSource: AudioBufferSourceNode | null = null;
let currentPresetId: string | null = null;

export async function playPreset(
  zone: Zone,
  state: HRState,
  bpmRange?: [number, number]
) {
  try {
    const preset = getRandomPreset(zone, state, bpmRange);
    if (!preset || !preset.selectedLoop) return;

    // const url = preset.selectedLoop;
    const url =
      "https://software-mansion.github.io/react-native-audio-api/audio/music/example-music-01.mp3";
    log(`Playing preset: ${preset.id} met loop: ${url}`, "AUDIO");

    const audioBuffer = await loadAudioBuffer(url);
    const audioContext = getAudioContext();

    // Stop de huidige bron als die nog speelt
    if (currentSource) {
      currentSource.stop();
      currentSource.disconnect();
      log("Current buffer stopped", "AUDIO");
    }

    // Maak een nieuwe AudioBufferSourceNode aan
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer as AudioBuffer;
    source.connect(audioContext.destination);
    source.start();

    // Sla de huidige node op voor later stoppen
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
