import audioPresets from "../presets/audioPresets";
import { loadAudioBuffer } from "./audioBufferLoader";
import { HRState, Zone } from "../types/audioPresets";

// Preload the first loopUrls for each preset
export async function preloadAllPresets() {
    console.log("🚀 Preloading all presets...");
    for (const zone of Object.keys(audioPresets) as Zone[]) {
        for (const state of Object.keys(audioPresets[zone]) as HRState[]) {
            const presets = audioPresets[zone][state];
            for (const preset of presets) {
                const url = preset.loopUrls[0]; // Later BPM filter
                await loadAudioBuffer(url);
            }
        }
    }
    console.log("✅ All presets preloaded");
}

// Preload only the presets for a specific zone
export async function preloadZone(zone: Zone) {
    console.log(`🚀 Preloading presets for zone: ${zone}`);
    const stateKeys = Object.keys(audioPresets[zone]) as HRState[];
    for (const state of stateKeys) {
        const presets = audioPresets[zone][state];
        for (const preset of presets) {
            const url = preset.loopUrls[0]; // Later BPM filter
            await loadAudioBuffer(url);
        }
    }
    console.log(`✅ Presets for zone "${zone}" preloaded`);
}
