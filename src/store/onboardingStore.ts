import { create } from "zustand";

type OnboardingData = {
  useCase: string | null;
  intent: string | null;
  name: string;
  setUseCase: (val: string) => void;
  setIntent: (val: string) => void;
  setName: (val: string) => void;
};

const useOnboardingStore = create<OnboardingData>((set) => ({
  useCase: null,
  intent: null,
  name: "",
  setUseCase: (useCase) => set({ useCase }),
  setIntent: (intent) => set({ intent }),
  setName: (name) => set({ name }),
}));

export default useOnboardingStore;
