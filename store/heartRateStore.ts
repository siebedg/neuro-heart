import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SessionStats = {
  avg: number;
  min: number;
  max: number;
};

type Store = {
  hr: number;
  hrHistory: number[];
  sessionStats: SessionStats;
  setHr: (val: number) => void;
  addHrToHistory: (val: number) => void;
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

      setHr: (val) => set({ hr: val }),

      // Add a new heart rate value to the history and update the stats
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

      // Reset the session stats and history
      resetSession: () =>
        set({
          hrHistory: [],
          sessionStats: { avg: 75, min: 75, max: 75 },
        }),
    }),

    {
      name: "heart-rate-store",
      storage: createJSONStorage(() => AsyncStorage), 
    }
  )
);

export default useHeartRateStore;
