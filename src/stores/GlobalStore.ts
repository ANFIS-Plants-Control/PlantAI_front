import { create } from "zustand";

interface GlobalStore {
  isShowNotAvailable: boolean;
  showNotAvailable: () => void;
  hideNotAvailable: () => void;
}

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  isShowNotAvailable: false,
  showNotAvailable: () => {
    set({ isShowNotAvailable: true });
  },
  hideNotAvailable: () => {
    set({ isShowNotAvailable: false });
  },
}));
