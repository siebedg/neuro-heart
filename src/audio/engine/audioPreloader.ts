import audioPresets from "../presets/audioPresets";
import { loadAudioBuffer } from "./audioBufferLoader";
import { HRState, Zone } from "../types/audioPresets";
import { log } from "../../utils/log.util";
// Preload the first loopUrls for each preset
export async function preloadAllPresets() {
  log("🚀 Preloading all presets...", "PRELOADER");
  for (const zone of Object.keys(audioPresets) as Zone[]) {
    for (const state of Object.keys(audioPresets[zone]) as HRState[]) {
      const presets = audioPresets[zone][state];
      for (const preset of presets) {
        const url = preset.loopUrls[0]; // Later BPM filter
        await loadAudioBuffer(url);
      }
    }
  }
  log("✅ All presets preloaded", "PRELOADER");
}

// Preload only the presets for a specific zone
export async function preloadZone(zone: Zone) {
  log(`🚀 Preloading presets for zone: ${zone}`, "PRELOADER");
  const stateKeys = Object.keys(audioPresets[zone]) as HRState[];
  for (const state of stateKeys) {
    const presets = audioPresets[zone][state];
    for (const preset of presets) {
      const url = preset.loopUrls[0]; // Later BPM filter
      await loadAudioBuffer(url);
    }
  }
  log(`✅ Presets for zone "${zone}" preloaded`, "PRELOADER");
}
