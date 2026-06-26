import { create } from "zustand";
import {
  MqttClient,
  BrokerParameters,
  TopicDefinition,
  DataGroup,
  DashboardIntervention,
  DashboardMessage,
  DashboardStatus,
  IncomingSensorData,
  SensorDataSignalRPayload,
} from "./models";
import {
  GetAvailableBrokers,
  GetBrokerParameters,
  GetClients,
  GetDataGroups,
  GetSensorsData,
  GetSubscribedClients,
  GetTopicDefinitions,
} from "./api";
import { SetClientsStatuses } from "./utils";
import { SensorData } from "./models/SensorData";

const dashboardStatuses: DashboardStatus[] = [
  "требуется вмешательство",
  "удовлетворительно",
  "хорошо",
  "вмешательств не требуется",
];

const dashboardInterventions: DashboardIntervention[] = [
  "температура",
  "влажность",
];

const dashboardMessagesLimit = 6;
const dashboardMessageDedupeMs = 1000;
let temporaryDataGroupId = -1;
let temporarySensorDataId = -1;

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function createDashboardMessage(): DashboardMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    status: getRandomItem(dashboardStatuses),
    value: Math.round(Math.random() * 100) / 100,
    intervention: getRandomItem(dashboardInterventions),
    interventionMinutes: Math.floor(Math.random() * 10) + 1,
    createdAt: new Date(),
  };
}

function getNumberOrFallback(value: unknown, fallback: number) {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string") {
    const parsedValue = Number(value);
    if (Number.isFinite(parsedValue)) return parsedValue;
  }

  return fallback;
}

function getPayloadClientId(payload: SensorDataSignalRPayload) {
  return payload.sourceClientId ?? payload.clientId ?? payload.ClientId;
}

function getPayloadTopic(payload: SensorDataSignalRPayload) {
  return payload.sourceTopic ?? payload.topic ?? payload.Topic;
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

function normalizeSignalRPayload(
  payload: SensorDataSignalRPayload,
  clients: MqttClient[],
  topics: TopicDefinition[],
): DataGroup {
  const existingGroup = payload.dataGroup ?? payload.DataGroup;
  if (existingGroup) {
    return {
      ...existingGroup,
      sourceClientId: existingGroup.sourceClientId ?? getPayloadClientId(payload),
      sourceTopic: existingGroup.sourceTopic ?? getPayloadTopic(payload),
      sensorData: Array.isArray(existingGroup.sensorData)
        ? existingGroup.sensorData
        : [],
    };
  }

  if (payload.sensorData) {
    return {
      ...(payload as DataGroup),
      sourceClientId: getPayloadClientId(payload),
      sourceTopic: getPayloadTopic(payload),
      sensorData: Array.isArray(payload.sensorData) ? payload.sensorData : [],
    };
  }

  const id = getNumberOrFallback(payload.id ?? payload.Id, temporaryDataGroupId--);
  const sourceClientId = getPayloadClientId(payload);
  const sourceTopic = getPayloadTopic(payload);
  const clientFromString = clients.find(
    (client) => client.clientId === sourceClientId,
  );
  const topicFromString = topics.find((topic) => topic.topic === sourceTopic);
  const sensorData = payload.sensorsData ?? payload.SensorsData ?? [];

  return {
    id,
    date: payload.date ?? payload.Date ?? new Date(),
    mqttClientId: getNumberOrFallback(
      payload.mqttClientId ?? payload.MqttClientId,
      clientFromString?.id ?? 0,
    ),
    topicId: getNumberOrFallback(
      payload.topicId ?? payload.TopicId,
      topicFromString?.id ?? 0,
    ),
    sourceClientId,
    sourceTopic,
    sensorData: sensorData.map((data) => normalizeIncomingSensorData(data, id)),
  };
}

interface MqttDashboardStore {
  mqttClients: MqttClient[];
  brokers: BrokerParameters[];
  availableBrokers: BrokerParameters[];
  topics: TopicDefinition[];
  dataGroups: DataGroup[];
  sensorDatas: SensorData[];
  dashboardMessages: DashboardMessage[];
  initialized: boolean;
  init: () => void;
  updateSensorsData: (data: SensorDataSignalRPayload) => void;
  pushDashboardMessage: () => void;
  checkBrokerActive: () => void;
}

export const useMqttDashboardStore = create<MqttDashboardStore>((set, get) => ({
  mqttClients: [],
  brokers: [],
  availableBrokers: [],
  topics: [],
  dataGroups: [],
  sensorDatas: [],
  dashboardMessages: [],

  initialized: false,
  init: async () => {
    const brokers = await GetBrokerParameters();
    const clients = SetClientsStatuses(
      await GetClients(),
      await GetSubscribedClients(),
    );
    const topics = await GetTopicDefinitions();
    const dataGroups = await GetDataGroups();
    const sensorDatas = await GetSensorsData();
    set({
      mqttClients: clients,
      brokers: brokers,
      topics: topics,
      dataGroups: dataGroups,
      sensorDatas: sensorDatas,
      initialized: true,
    });
  },

  updateSensorsData: (data: SensorDataSignalRPayload) => {
    const normalizedData = normalizeSignalRPayload(
      data,
      get().mqttClients,
      get().topics,
    );

    set({
      dataGroups: [...get().dataGroups, normalizedData],
      sensorDatas: [
        ...get().sensorDatas,
        ...(normalizedData.sensorData ?? []),
      ],
    });
  },

  pushDashboardMessage: () => {
    const latestMessage = get().dashboardMessages[0];
    if (
      latestMessage &&
      Date.now() - latestMessage.createdAt.getTime() < dashboardMessageDedupeMs
    ) {
      return;
    }

    set({
      dashboardMessages: [
        createDashboardMessage(),
        ...get().dashboardMessages,
      ].slice(0, dashboardMessagesLimit),
    });
  },

  checkBrokerActive: async () => {
    const availableBrokers = await GetAvailableBrokers();
    set({ availableBrokers: availableBrokers });
  },
}));
