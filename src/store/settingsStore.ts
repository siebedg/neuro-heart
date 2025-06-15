import { create } from "zustand";

interface SettingsState {
  useMockHR: boolean; // toggle mock vs BLE
  selectedDeviceKeyword: string; // which BLE-device to use
  setUseMockHR: (v: boolean) => void;
  setSelectedDeviceKeyword: (k: string) => void;
}

const useSettingsStore = create<SettingsState>((set) => ({
  useMockHR: true,
  selectedDeviceKeyword: "",
  setUseMockHR: (v) =>
    set((state) => ({
      useMockHR: v,
      // when enabling mock, clear any selected BLE device to stop BLE flow
      ...(v && { selectedDeviceKeyword: "" }),
    })),
  setSelectedDeviceKeyword: (k) => set({ selectedDeviceKeyword: k }),
}));

export default useSettingsStore;
