import { create } from "zustand";
import { BrokerParameters } from "../dashboard/models";
import { TopicDefinition } from "./models/TopicDefinition";
import { CreateMqttClient, MqttClient } from "./models/MqttClient";
import {
  CreateClient,
  GetBrokerParameters,
  GetClients,
  GetSubscribedClients,
  GetTopicDefinitions,
  Synchronize,
} from "./api";
import { SetClientsStatuses } from "./utils";

export interface MqttClientStore {
  clients: MqttClient[];
  editClient: MqttClient;
  createClient: CreateMqttClient;

  brokers: BrokerParameters[];
  topics: TopicDefinition[];

  init: () => void;
  synchronize: () => void;

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
  createClient: { clientId: "", brokerId: "" },

  brokers: [],
  topics: [],

  init: async () => {
    const clients = SetClientsStatuses(
      await GetClients(),
      await GetSubscribedClients(),
    );
    const brokers = await GetBrokerParameters();
    const topics = await GetTopicDefinitions();
    set({ clients: clients, brokers: brokers, topics: topics });
  },

  synchronize: async () => {
    await Synchronize();
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
      createClient: { clientId: "", brokerId: "" },
    });
  },
  setCreateClient: <T extends keyof CreateMqttClient>(
    key: T,
    value: CreateMqttClient[T],
  ) => {
    console.log(value);
    set({ createClient: { ...get().createClient, [key]: value } });
  },
  handleCreateClient: async () => {
    await CreateClient(get().createClient);
  },
}));
