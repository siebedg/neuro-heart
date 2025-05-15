import { getAudioContext } from "./audioContext";

// Functie om een audiobuffer te laden
export async function loadAudioBuffer(url: string): Promise<AudioBuffer> {
    const audioContext = getAudioContext();
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    console.log(`🔉 AudioBuffer geladen van: ${url}`);
    return audioBuffer;
}
