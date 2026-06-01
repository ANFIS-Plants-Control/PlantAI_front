import { TopicDefinition } from "./TopicDefinition";

export interface MqttClient {
  clientId: string;
  topic: TopicDefinition[];
}

export interface SubscribeMqttClient {
  ClientId: string;
  Topic: string;
}
