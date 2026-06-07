import { create } from "zustand";
import {
  Dashboard,
  MqttClient,
  BrokerParameters,
  TopicDefinition,
  DataGroup,
} from "./models";
import {
  GetBrokerParameters,
  GetClients,
  GetDataGroups,
  GetSubscribedClients,
  GetTopicDefinitions,
} from "./api";
import { DashboardBuilder, SetClientsStatuses } from "./utils";

interface MqttDashboardStore {
  dashboard: Dashboard[];
  mqttClients: MqttClient[];
  brokers: BrokerParameters[];
  topics: TopicDefinition[];
  dataGroups: DataGroup[];
  initialized: boolean;
  init: () => void;
}

export const useMqttDashboardStore = create<MqttDashboardStore>((set, get) => ({
  dashboard: [],
  mqttClients: [],
  brokers: [],
  topics: [],
  dataGroups: [],
  initialized: false,
  init: async () => {
    const brokers = await GetBrokerParameters();
    const clients = SetClientsStatuses(
      await GetClients(),
      await GetSubscribedClients(),
    );
    const topics = await GetTopicDefinitions();
    const dashboard = DashboardBuilder(clients, brokers, topics);
    const dataGroups = await GetDataGroups();
    set({
      dashboard: dashboard,
      mqttClients: clients,
      brokers: brokers,
      topics: topics,
      initialized: true,
      dataGroups: dataGroups,
    });
  },
}));
