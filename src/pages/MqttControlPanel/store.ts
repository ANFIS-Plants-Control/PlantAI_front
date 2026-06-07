import { create } from "zustand";
import { PanelComponent } from "./models/PanelComponent";

export interface MqttClientStore {
  panelComponent: PanelComponent;
  setPanelComponent: (component: PanelComponent) => void;
}

export const useMqttPanelStore = create<MqttClientStore>((set, get) => ({
  panelComponent: "Dashboard",
  setPanelComponent: (component: PanelComponent) => {
    set({ panelComponent: component });
  },
}));
