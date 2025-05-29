import { User } from "firebase/auth";
import { create } from "zustand";

type AuthState = {
  user: User | null | undefined;
  setUser: (user: User | null) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
