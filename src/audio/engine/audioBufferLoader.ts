import { log, errorLog } from "../../utils/log.util";
import { getAudioContext } from "./audioContext";
import { AudioBuffer } from "react-native-audio-api";
import { Asset } from "expo-asset";
import { audioAssetMap } from "../presets/audioAssets"; 

const bufferCache = new Map<string, AudioBuffer>();

export async function loadAudioBuffer(key: string): Promise<AudioBuffer> {
  if (bufferCache.has(key)) {
    log(`Buffer loaded from cache: ${key}`, "BUFFER");
    return bufferCache.get(key)!;
  }
  try {
    const audioContext = getAudioContext();

    const assetModule = audioAssetMap[key];
    const asset = Asset.fromModule(assetModule);
    await asset.downloadAsync();

    const audioBuffer = await audioContext.decodeAudioDataSource(asset.localUri!);
    bufferCache.set(key, audioBuffer);
    log(`✅ Buffer coded and cached: ${key}`, "BUFFER");
    return audioBuffer;
  } catch (error) {
    errorLog(`Error loading buffer: ${key} - ${error}`, "BUFFER");
    throw error;
  }
}

// Function to clear the cache (for memory management)
export function clearBufferCache() {
  bufferCache.clear();
  log("🗑️ Buffer cache cleared", "BUFFER");
}
