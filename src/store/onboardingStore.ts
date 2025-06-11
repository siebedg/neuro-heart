import { create } from "zustand";

type FitnessLevel = "beginner" | "intermediate" | "advanced";

type OnboardingData = {
  useCase: string | null;
  intent: string | null;
  name: string;
  age: number;
  fitnessLevel: FitnessLevel;
  setUseCase: (val: string) => void;
  setIntent: (val: string) => void;
  setName: (val: string) => void;
  setAge: (age: number) => void;
  setFitnessLevel: (level: FitnessLevel) => void;
};

const useOnboardingStore = create<OnboardingData>((set) => ({
  useCase: null,
  intent: null,
  name: "",
  age: 25,
  fitnessLevel: "intermediate",
  setUseCase: (useCase) => set({ useCase }),
  setIntent: (intent) => set({ intent }),
  setName: (name) => set({ name }),
  setAge: (age) => set({ age }),
  setFitnessLevel: (level) => set({ fitnessLevel: level }),
}));

export default useOnboardingStore;
