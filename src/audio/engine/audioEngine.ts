import { loadAudioBuffer } from "./audioBufferLoader";
import { getAudioContext } from "./audioContext";
import { AudioBuffer, AudioBufferSourceNode } from "react-native-audio-api";
import { Zone, HRState } from "../types/audioPresets";
import { errorLog, log } from "../../utils/log.util";
import { getRandomPreset } from "../presets/presetUtils";
import { startBinauralBeats, stopBinauralBeats } from "./binauralEngine";

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

    const url = preset.selectedLoop;
    log(`Playing preset: ${preset.id} met loop: ${url}`, "AUDIO");

    const audioBuffer = await loadAudioBuffer(url);
    const audioContext = getAudioContext();

    // Stop de huidige bron als die nog speelt
    if (currentSource) {
      currentSource.stop();
      currentSource.disconnect();
      log("Current buffer stopped", "AUDIO");
    }
    // stopBinauralBeats();

    // Maak een nieuwe AudioBufferSourceNode aan
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer as AudioBuffer;
    source.connect(audioContext.destination);
    source.start();

    // Sla de huidige node op voor later stoppen
    currentSource = source;
    currentPresetId = preset.id;
    log(`Started playing: ${url}`, "AUDIO");

    // Start binaural AFTER stop + start buffer
    if (preset.brainwaveHz && preset.brainwaveHz.length === 2) {
      const beatFreq = (preset.brainwaveHz[0] + preset.brainwaveHz[1]) / 2;
      const baseFreq = 440; // of random tussen 420–460 als je wil variatie

      // startBinauralBeats(baseFreq, baseFreq + beatFreq);
      log(`Started binaural: ${baseFreq}Hz + ${beatFreq}Hz`, "AUDIO");
    }
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
    stopBinauralBeats();
  }
}

