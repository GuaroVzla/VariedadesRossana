"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AppState {
  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Theme
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Sidebar
        sidebarOpen: true,
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarOpen: (open) => set({ sidebarOpen: open }),

        // Theme
        theme: "system",
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: "app-store",
        partialize: (state) => ({
          sidebarOpen: state.sidebarOpen,
          theme: state.theme,
        }),
      },
    ),
  ),
);

