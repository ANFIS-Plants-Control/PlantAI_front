import { create } from "zustand";
import { GetDataGroups, GetSensorData } from "./api";
import {
  DataGroup,
  IncomingSensorData,
  SensorData,
  SensorDataSignalRPayload,
} from "./models";

let temporaryDataGroupId = -1;
let temporarySensorDataId = -1;

function getNumberOrFallback(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function normalizeIncomingSensorData(
  data: IncomingSensorData,
  dataGroupId: number,
): SensorData {
  return {
    id: getNumberOrFallback(data.id ?? data.Id, temporarySensorDataId--),
    value: getNumberOrFallback(data.value ?? data.Value, 0),
    sensorTypeId: getNumberOrFallback(data.sensorTypeId ?? data.SensorTypeId, 0),
    dataGroupId: getNumberOrFallback(
      data.dataGroupId ?? data.DataGroupId,
      dataGroupId,
    ),
    networkResponse:
      typeof (data.networkResponse ?? data.NetworkResponse) === "number"
        ? (data.networkResponse ?? data.NetworkResponse)
        : undefined,
  };
}

function normalizeSignalRPayload(payload: SensorDataSignalRPayload): DataGroup {
  const existingGroup = payload.dataGroup ?? payload.DataGroup;
  if (existingGroup) {
    return {
      ...existingGroup,
      sensorData: Array.isArray(existingGroup.sensorData)
        ? existingGroup.sensorData
        : [],
    };
  }

  if (payload.sensorData) {
    return {
      ...(payload as DataGroup),
      sensorData: Array.isArray(payload.sensorData) ? payload.sensorData : [],
    };
  }

  const id = getNumberOrFallback(payload.id ?? payload.Id, temporaryDataGroupId--);
  const sensorData = payload.sensorsData ?? payload.SensorsData ?? [];

  return {
    id,
    date: payload.date ?? payload.Date ?? new Date(),
    mqttClientId: getNumberOrFallback(payload.mqttClientId ?? payload.MqttClientId, 0),
    topicId: getNumberOrFallback(payload.topicId ?? payload.TopicId, 0),
    sensorData: sensorData.map((data) => normalizeIncomingSensorData(data, id)),
  };
}

interface SensorDataStore {
  dataGroups: DataGroup[];
  sensorData: SensorData[];
  initialized: boolean;
  init: () => Promise<void>;
  updateSensorsData: (data: SensorDataSignalRPayload) => void;
}

export const useSensorDataStore = create<SensorDataStore>((set, get) => ({
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
  updateSensorsData: (data) => {
    const normalizedData = normalizeSignalRPayload(data);

    set({
      dataGroups: [...get().dataGroups, normalizedData],
      sensorData: [
        ...get().sensorData,
        ...(normalizedData.sensorData ?? []),
      ],
    });
  },
}));
