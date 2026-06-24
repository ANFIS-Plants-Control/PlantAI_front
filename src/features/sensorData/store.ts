import { create } from "zustand";
import { GetDataGroups, GetSensorData } from "./api";
import { DataGroup, SensorData } from "./models";

interface SensorDataStore {
  dataGroups: DataGroup[];
  sensorData: SensorData[];
  initialized: boolean;
  init: () => Promise<void>;
}

export const useSensorDataStore = create<SensorDataStore>((set) => ({
  dataGroups: [],
  sensorData: [],
  initialized: false,
  init: async () => {
    const [dataGroups, sensorData] = await Promise.all([
      GetDataGroups(),
      GetSensorData(),
    ]);

    set({ dataGroups, sensorData, initialized: true });
  },
}));
