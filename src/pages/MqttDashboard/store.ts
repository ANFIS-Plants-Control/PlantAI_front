import { create } from "zustand";
import { MqttClientModel, SubscribeMqttClient } from "./models/MqttClientModel";

export interface MqttClientStore {
  mqttClients: MqttClientModel[];
  createMqttClientParameters: MqttClientModel;
  subscribeMqttCLientParameters: SubscribeMqttClient;
  initialized: boolean;
}

export const useMqttClientsStore = create<MqttClientStore>((set, get) => ({
  mqttClients: [],
  createMqttClientParameters: {} as MqttClientModel,
  subscribeMqttCLientParameters: {} as SubscribeMqttClient,
  initialized: false,
}));
