import { create } from "zustand";

export interface AppStore {
  modal: boolean;
  showModal: (value: boolean) => void;
  closeModal: () => void;
}

export const useAppStore = create<AppStore>()((set) => ({
  modal: false,
  showModal: (value) => {
    set(() => ({ modal: value }));
  },
  closeModal: () => {
    set(() => ({
      modal: false,
    }));
  },
}));
