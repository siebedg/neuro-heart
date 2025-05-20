import { log, errorLog } from "../../utils/log.util";
import { getAudioContext } from "./audioContext";
import { AudioBuffer } from "react-native-audio-api";
import * as FileSystem from "expo-file-system";

const bufferCache = new Map<string, AudioBuffer>();

export async function loadAudioBuffer(url: string): Promise<AudioBuffer> {
  if (bufferCache.has(url)) {
    log(`Buffer loaded from cache: ${url}`, "BUFFER");
    return bufferCache.get(url)!;
  }
  try {
    // Buffer not in cache, load it
    const audioContext = getAudioContext();
    const audioBuffer = await FileSystem.downloadAsync(
      url,
      `${FileSystem.documentDirectory}/${url}`
    ).then(({ uri }) => audioContext.decodeAudioDataSource(uri));

    // Save buffer to cache
    bufferCache.set(url, audioBuffer);
    log(`✅ Buffer coded and added to cache: ${url}`, "BUFFER");
    return audioBuffer;
  } catch (error) {
    errorLog(`Error loading buffer: ${url} - ${error}`, "BUFFER");
    throw error;
  }
}

// Function to clear the cache (for memory management)
export function clearBufferCache() {
  bufferCache.clear();
  log("🗑️ Buffer cache cleared", "BUFFER");
}
