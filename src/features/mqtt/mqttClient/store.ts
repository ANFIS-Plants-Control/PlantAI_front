import { create } from "zustand";
import { BrokerParameters } from "../dashboard/models";
import { TopicDefinition } from "./models/TopicDefinition";
import { CreateMqttClient, MqttClient } from "./models/MqttClient";
import {
  GetBrokerParameters,
  GetClients,
  GetSubscribedClients,
  GetTopicDefinitions,
} from "./api";
import { SetClientsStatuses } from "./utils";

export interface MqttClientStore {
  clients: MqttClient[];
  editClient: MqttClient;
  createClient: CreateMqttClient;

  brokers: BrokerParameters[];
  topics: TopicDefinition[];

  init: () => void;

  isEdit: boolean;
  openEdit: (id: number) => void;
  closeEdit: () => void;
  updateClient: <T extends keyof MqttClient>(
    key: T,
    value: MqttClient[T],
  ) => void;
  handleEditClient: () => void;

  isCreate: boolean;
  openCreate: () => void;
  closeCreate: () => void;
  setCreateClient: <T extends keyof CreateMqttClient>(
    key: T,
    value: CreateMqttClient[T],
  ) => void;
  handleCreateClient: () => void;
}

export const useMqttClientStore = create<MqttClientStore>((set, get) => ({
  clients: [],
  editClient: {} as MqttClient,
  createClient: { clientId: "", brokerId: "", topicId: "" } as CreateMqttClient,

  brokers: [],
  topics: [],

  init: async () => {
    const clients = SetClientsStatuses(
      await GetClients(),
      await GetSubscribedClients(),
    );
    const brokers = await GetBrokerParameters();
    const topics = await GetTopicDefinitions();
    console.log("render");
    set({ clients: clients, brokers: brokers, topics: topics });
  },

  isEdit: false,
  openEdit: (id: number) => {
    set({ isEdit: true, editClient: get().clients.find((c) => c.id) });
  },
  closeEdit: () => {
    set({ isEdit: false, editClient: {} as MqttClient });
  },
  updateClient: <T extends keyof MqttClient>(key: T, value: MqttClient[T]) => {
    set({ editClient: { ...get().editClient, [key]: value } });
  },
  handleEditClient: async () => {},

  isCreate: false,
  openCreate: () => {
    set({ isCreate: true });
  },
  closeCreate: () => {
    set({
      isCreate: false,
      createClient: { clientId: "", brokerId: "", topicId: "" },
    });
  },
  setCreateClient: <T extends keyof CreateMqttClient>(
    key: T,
    value: CreateMqttClient[T],
  ) => {
    set({ createClient: { ...get().createClient, [key]: value } });
  },
  handleCreateClient: async () => {},
}));
