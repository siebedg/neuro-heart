import { create } from "zustand";
import { Zone, HRState } from "../types/audioPresets";
import { playPreset, stopPreset } from "../engine/audioEngine";

type AudioState = {
  currentPresetId: string | null;
  isPlaying: boolean;
  currentZone: Zone | null;
  currentState: HRState | null;
  play: (zone: Zone, state: HRState) => void;
  stop: () => void;
};

export const useAudioStore = create<AudioState>((set, get) => ({
  currentPresetId: null,
  isPlaying: false,
  currentZone: null,
  currentState: null,

  play: (zone, state) => {
    set({ currentZone: zone, currentState: state, isPlaying: true });
    playPreset(zone, state);
  },

  stop: () => {
    set({ currentPresetId: null, isPlaying: false });
    stopPreset();
  },
}));
