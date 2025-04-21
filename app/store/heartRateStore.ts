import { create } from "zustand";

type Store = {
  hr: number;
  setHr: (val: number) => void;
};

export const useHeartRateStore = create<Store>((set) => ({
  hr: 75,
  setHr: (val) => set({ hr: val }),
}));
