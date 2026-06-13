import { get, postBody } from "../../../utils/api/BaseApiClient";
import { BrokerParameters } from "./models/BrokerParameters";
import { CreateMqttClient, MqttClient } from "./models/MqttClient";
import { TopicDefinition } from "./models/TopicDefinition";

export async function GetClients(): Promise<MqttClient[]> {
  const data = await get<MqttClient[]>("/api/MqttClients/linked-topics");
  console.log(data);
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

export async function GetSubscribedClients(): Promise<string[]> {
  const data = await get<string[]>("/api/MqttClients/subscribed");
  if (data !== null) return data;
  return [];
}

export async function CreateClient(body: CreateMqttClient) {
  const message = await postBody<CreateMqttClient, string>(
    "/api/MqttClients",
    body,
  );
  console.log(message);
}

export async function Synchronize() {
  const message = await get<string>("/api/MqttClients/synchronize");
  console.log(message);
}
