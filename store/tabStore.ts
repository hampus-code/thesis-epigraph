// src/store/useTabStore.ts
import { create } from "zustand";

type TabKey = "home" | "bookList" | "search" | "account";

interface TabState {
  selectedTab: TabKey;
  setSelectedTab: (tab: TabKey) => void;
}

export const useTabStore = create<TabState>((set) => ({
  selectedTab: "home",
  setSelectedTab: (tab) => set({ selectedTab: tab })
}));
