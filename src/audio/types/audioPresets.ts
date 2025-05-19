type Mood =
  | "boostEnergy"
  | "maintainFocus"
  | "controlIntensity"
  | "encouragePace"
  | "supportRhythm"
  | "calmBreathing"
  | "preventUnderrelaxation"
  | "deepenRelaxation"
  | "forceRecovery";

type BrainwaveType = "delta" | "theta" | "alpha" | "beta" | "gamma";
type BPMRange = [number, number]; // in BPM
type VolumeRange = [number, number]; // in dB
type FrequencyRange = [number, number]; // in Hz
type BrainwaveRange = [number, number]; // in Hz

type BinauralConfig = {
  carrierHz: number; // hoofdtoon, bv. 440 Hz
  beatHz: number; // verschil tussen L/R oor, bv. 6 Hz → theta
  durationMs?: number; // optioneel: hoelang de binaural actief moet blijven
  gain?: number; // optioneel: 0.0 - 1.0 voor volume van binaural layer
};

export interface Loop {
  url: string;
  bpm: number;
}

export type AudioPreset = {
  id: string;
  mood: Mood;
  bpm: BPMRange;
  loudnessDb: VolumeRange;
  tempoStyle: string;
  loopUrls: Loop[];
  loop?: boolean;
  fadeInMs?: number;
  fadeOutMs?: number;
  freqHz: FrequencyRange; // range, e.g. [10, 20] for 10-20 Hz
  brainwaveHz: BrainwaveRange;
  brainwaveType: BrainwaveType;
  label: string;
  debugLabel?: string; // for debugging purposes, not shown to users
  description?: string;
  selectedLoop?: string;
  binauralConfig?: BinauralConfig;
  // // Optional - Add later when needed
  // startOffsetMs?: number;
  // energyScore?: number;
  // recommendedDuration?: number;
  // contextTags?: string[];
  // isPremium?: boolean;
};

export type Zone = "activation" | "sustained" | "recovery"; // | "1" | "2" | "3" | "4" | "5";
export type HRState = "tooLow" | "optimal" | "tooHigh";

export type PresetStructure = {
  [zone in Zone]: {
    [state in HRState]: AudioPreset[];
  };
};
