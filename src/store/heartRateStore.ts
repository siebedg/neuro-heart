import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HRState, Zone } from "@/src/audio/types";

type SessionStats = {
  avg: number;
  min: number;
  max: number;
};

export interface HeartRateData {
  heartRate: number;
  timestamp: number;
  zone: {
    zone: Zone;
    state: HRState;
    rel: number;
    smoothedHR?: number;
  };
}

type Store = {
  hr: number;
  hrHistory: number[];
  sessionStats: SessionStats;
  currentHeartRateData: HeartRateData | null;
  setHr: (val: number) => void;
  addHrToHistory: (val: number) => void;
  setCurrentHeartRateData: (data: HeartRateData) => void;
  resetSession: () => void;
};

const useHeartRateStore = create<Store>()(
  persist(
    (set, get) => ({
      hr: 75,
      hrHistory: [],
      sessionStats: {
        avg: 75,
        min: 75,
        max: 75,
      },
      currentHeartRateData: null,

      setHr: (val) => set({ hr: val }),

      addHrToHistory: (val) => {
        const history = [...get().hrHistory.slice(-49), val];
        const min = Math.min(...history);
        const max = Math.max(...history);
        const avg = Math.round(
          history.reduce((a, b) => a + b, 0) / history.length
        );

        set({
          hrHistory: history,
          sessionStats: { avg, min, max },
        });
      },

      setCurrentHeartRateData: (data) => {
        set({ currentHeartRateData: data });
      },

      resetSession: () =>
        set({
          hrHistory: [],
          sessionStats: { avg: 75, min: 75, max: 75 },
          currentHeartRateData: null,
        }),
    }),
    {
      name: "heart-rate-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useHeartRateStore;
