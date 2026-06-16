import { create } from "zustand";
import {
  MqttClient,
  BrokerParameters,
  TopicDefinition,
  DataGroup,
} from "./models";
import {
  GetBrokerParameters,
  GetClients,
  GetDataGroups,
  GetSensorsData,
  GetSubscribedClients,
  GetTopicDefinitions,
} from "./api";
import { SetClientsStatuses } from "./utils";
import { SensorData } from "./models/SensorData";

interface MqttDashboardStore {
  mqttClients: MqttClient[];
  brokers: BrokerParameters[];
  topics: TopicDefinition[];
  dataGroups: DataGroup[];
  sensorDatas: SensorData[];
  initialized: boolean;
  init: () => void;
}

export const useMqttDashboardStore = create<MqttDashboardStore>((set, get) => ({
  mqttClients: [],
  brokers: [],
  topics: [],
  dataGroups: [],
  sensorDatas: [],
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
}));
