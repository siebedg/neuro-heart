import { log, errorLog } from "../../utils/log.util";
import { getAudioContext } from "./audioContext";
import { AudioBuffer } from "react-native-audio-api";
// import decodeAudioDataSource from "react-native-audio-api";

const bufferCache = new Map<string, AudioBuffer>();

export async function loadAudioBuffer(url: string): Promise<AudioBuffer> {
  if (bufferCache.has(url)) {
    log(`Buffer uit cache geladen: ${url}`, "BUFFER");
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
    log(`✅ Buffer gedecodeerd en toegevoegd aan cache: ${url}`, "BUFFER");
    return audioBuffer;
  } catch (error) {
    errorLog(`Fout bij het laden van buffer: ${url} - ${error}`, "BUFFER");
    throw error;
  }
}

// Function to clear the cache (for memory management)
export function clearBufferCache() {
  bufferCache.clear();
  log("🗑️ Buffer cache leeggemaakt", "BUFFER");
}
