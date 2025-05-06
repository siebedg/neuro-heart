// // replace me later 


// loudnessDb: [number, number];
export const dbToGain = (db: number, minDb = 50, maxDb = 80) =>
    Math.max(0, Math.min(1, (db - minDb) / (maxDb - minDb)));

// // 🔗 How to link it to loudnessDb

// // Assuming each preset has a loudnessDb: [min, max], you can convert it like:

// const [minDb, maxDb] = preset.loudnessDb;
// const gain = dbToGain((minDb + maxDb) / 2);