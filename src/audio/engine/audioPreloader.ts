import audioPresets from "../presets/audioPresets";
import { loadAudioBuffer } from "./audioBufferLoader";
import { HRState, Zone } from "../types/audioPresets";
import { log } from "../../utils/log.util";
import { getRandomPreset } from "../presets/presetUtils";

export async function preloadAllPresets() {
  log("Preloading all presets...", "PRELOADER");
  for (const zone of Object.keys(audioPresets) as Zone[]) {
    for (const state of Object.keys(audioPresets[zone]) as HRState[]) {
      const preset = getRandomPreset(zone, state);
      if (preset) {
        for (const loop of preset.loopUrls) {
          await loadAudioBuffer(loop.url);
        }
      }
    }
  }
  log("All presets preloaded", "PRELOADER");
}

export async function preloadZone(zone: Zone, state: HRState) {
  const preset = getRandomPreset(zone, state);
  if (preset) {
    for (const loop of preset.loopUrls) {
      await loadAudioBuffer(loop.url);
    }
  }
}

