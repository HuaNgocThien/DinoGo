import { create } from "zustand";
import { UserDoc } from "../types";
interface AuthState {
  user: UserDoc | null;
  isInitialized: boolean;
  setUser: (user: UserDoc | null) => void;
  setInitialized: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isInitialized: false,
  setUser: (user: UserDoc | null) => set({ user }),
  setInitialized: (value: boolean) => set({ isInitialized: value }),
}));
