import { TopicDefinition } from "./TopicDefinition";

export interface MqttClient {
  id: number;
  clientId: string;
  topics: TopicDefinition[];
  brokerId: number;
  isSubscribed: boolean;
}

export interface CreateMqttClient {
  clientId: string;
  brokerId: string;
}
