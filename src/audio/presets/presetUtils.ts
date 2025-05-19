import { errorLog, log } from "@/src/utils/log.util";
import { Zone, HRState, AudioPreset } from "../types/audioPresets";
import audioPresets from "./audioPresets";


/**
 * Kies een preset en loop op basis van zone, state en (optioneel) bpm range.
 */
export function getRandomPreset(zone: Zone, state: HRState, bpmRange?: [number, number]): AudioPreset | null {
    const moodPresets = audioPresets[zone]?.[state];
    if (!moodPresets || moodPresets.length === 0) {
        errorLog(`Geen presets gevonden voor zone "${zone}" en state "${state}"`, "PRESET");
        return null;
    }

    // Filter presets op bpm range
    let filteredPresets = moodPresets;
    if (bpmRange) {
        filteredPresets = moodPresets.filter((preset) => {
            const [minBPM, maxBPM] = preset.bpm;
            return bpmRange[0] <= maxBPM && bpmRange[1] >= minBPM;
        });

        if (filteredPresets.length === 0) {
            errorLog(`Geen presets gevonden voor zone "${zone}" en state "${state}" binnen BPM range ${bpmRange[0]} - ${bpmRange[1]}`, "PRESET");
            return null;
        }
    }

    // Kies een random preset
    const preset = filteredPresets[Math.floor(Math.random() * filteredPresets.length)];

    // Kies een loop op basis van BPM of random
    let selectedLoop;
    if (bpmRange) {
        const targetBPM = (bpmRange[0] + bpmRange[1]) / 2;
        const closestMatch = preset.loopUrls.reduce((best, loop) => {
            const currentDiff = Math.abs(loop.bpm - targetBPM);
            const bestDiff = Math.abs(best.bpm - targetBPM);
            return currentDiff < bestDiff ? loop : best;
        }, preset.loopUrls[0]);

        selectedLoop = closestMatch.url;
    } else {
        const randomLoop = preset.loopUrls[Math.floor(Math.random() * preset.loopUrls.length)];
        selectedLoop = randomLoop.url;
    }

    log(`Gekozen preset: ${preset.id} met loop: ${selectedLoop}`, "PRESET");

    // Voeg de selectedLoop toe aan de preset
    return { ...preset, selectedLoop };
}
