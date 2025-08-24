import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = { id: string; name: string; token:string };

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "auth-storage" }
  )
);
