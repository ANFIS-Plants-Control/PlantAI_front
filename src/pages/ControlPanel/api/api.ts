import { get, postEmpty } from "../../../utils/api/BaseApiClient";
import { BrokerParameters } from "../../../features/mqtt/dashboard/models/BrokerParameters";
import { MqttClient } from "../../../features/mqtt/dashboard/models/MqttClientModel";
import { TopicDefinition } from "../../../features/mqtt/dashboard/models/TopicDefinition";

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
  await postEmpty("/api/MqttClients/synchronize");
}

export async function GetSubscribedClients(): Promise<string[]> {
  const data = await get<string[]>("/api/MqttClients/subscribed");
  if (data !== null) return data;
  return [];
}
