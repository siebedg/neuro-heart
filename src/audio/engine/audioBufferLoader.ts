import { getAudioContext } from "./audioContext";
import { AudioBuffer } from "react-native-audio-api";
// import decodeAudioDataSource from "react-native-audio-api";

const bufferCache = new Map<string, AudioBuffer>();

export async function loadAudioBuffer(url: string): Promise<AudioBuffer> {
  if (bufferCache.has(url)) {
    console.log(`✅ Buffer uit cache geladen: ${url}`);
    return bufferCache.get(url)!;
  }
  try {
    // Buffer not in cache, load it
    const audioContext = getAudioContext();
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Save buffer to cache
    bufferCache.set(url, audioBuffer);
    console.log(`✅ Buffer gedecodeerd en toegevoegd aan cache: ${url}`);
    return audioBuffer;
  } catch (error) {
    console.error(`Fout bij het laden van buffer: ${url}`, error);
    throw error;
  }
}

// Function to clear the cache (for memory management)
export function clearBufferCache() {
  bufferCache.clear();
  console.log("🗑️ Buffer cache leeggemaakt");
}
