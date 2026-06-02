import { create } from "zustand";
import { EditMqttClient, MqttClient, SubscribeMqttClient } from "./models/MqttClientModel";
import { GetDashboard } from "./api/api";
import { Dashboard } from "./models/Dashboard";
import { TopicDefinition } from "./models/TopicDefinition";
import { BrokerParameters } from "./models/BrokerParameters";

export interface MqttClientStore {
  dashboard: Dashboard[];
  mqttClients: MqttClient[];
  createMqttClientParameters: MqttClient;
  subscribeMqttCLientParameters: SubscribeMqttClient;
  initialized: boolean;
  dialogOpen: boolean;
  editTopic: TopicDefinition;
  editBroker: BrokerParameters;
  editClient: EditMqttClient;
  handleOpenDialog: (isOpen: boolean) => void;
  init: () => void;
  handleEditClient: <T extends keyof EditMqttClient>(key: T, value: EditMqttClient[T]) => void;
}

export const useMqttClientsStore = create<MqttClientStore>((set, get) => ({
  dashboard: [],
  mqttClients: [],
  createMqttClientParameters: {} as MqttClient,
  subscribeMqttCLientParameters: {} as SubscribeMqttClient,
  initialized: false,
  dialogOpen: false,
  editTopic: {id: -1, topic: ''},
  editBroker: {id: -1, host: '', port: -1},
  editClient: {clientId: '', topicId: -1, brokerId: -1},
  handleOpenDialog: (isOpen: boolean) => set({dialogOpen: isOpen}),
  init: async () => {
    set({dashboard:await GetDashboard(), initialized: true});
    
  },
  handleEditClient: <T extends keyof EditMqttClient>(key: T, value: EditMqttClient[T]) => {
    set({editClient: {...get().editClient, [key]: value}})
    console.log(get().editClient)
  }
}));
