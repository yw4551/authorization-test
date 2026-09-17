import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthTypes {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
}

export const useAuth = create<AuthTypes>()(
    persist(
        (set) => ({
            token: null,
            setToken: (token) => set({ token }),
            logout: () => set({ token: null }),
        }),
        {
            name: "token-storage",
        },
    ),
);
