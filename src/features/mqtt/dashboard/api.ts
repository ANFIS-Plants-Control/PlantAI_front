import { BrokerParameters, MqttClient, TopicDefinition } from "./models";
import { get, postEmpty } from "../../../utils/api/BaseApiClient";
import { DataGroup } from "./models/DataGroup";
import { SensorData } from "./models/SensorData";

export async function GetClients(): Promise<MqttClient[]> {
  const data = await get<MqttClient[]>("/api/MqttClients");
  if (data !== null) return data;
  return [];
}

export async function GetBrokerParameters(): Promise<BrokerParameters[]> {
  const data = await get<BrokerParameters[]>("/api/BrokerParameters");
  if (data !== null) return data;
  return [];
}

export async function GetTopicDefinitions(): Promise<TopicDefinition[]> {
  const data = await get<TopicDefinition[]>("/api/Topic");
  if (data !== null) return data;
  return [];
}

export async function Synchronize() {
  const message = await postEmpty("/api/MqttClients/synchronize");
  alert(message);
}

export async function GetSubscribedClients(): Promise<string[]> {
  const data = await get<string[]>("/api/MqttClients/subscribed");
  if (data !== null) return data;
  return [];
}

export async function GetDataGroups(): Promise<DataGroup[]> {
  const data = await get<DataGroup[]>("/api/SensorData/data-groups");
  if (data !== null) return data;
  return [];
}

export async function GetSensorsData(): Promise<SensorData[]> {
  const data = await get<SensorData[]>("/api/SensorData");
  if (data !== null) return data;
  return [];
}
