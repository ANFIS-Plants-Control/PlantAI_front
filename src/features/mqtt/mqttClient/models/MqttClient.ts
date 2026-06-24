import { TopicDefinition } from "./TopicDefinition";

export interface MqttClient {
  id: number;
  clientId: string;
  topics: TopicDefinition[];
  brokerId: number;
  isConnected: boolean;
}

export interface CreateMqttClient {
  clientId: string;
  brokerId: string;
}

export interface CreateSubscribe {
  clientId: string;
  topicId: number;
}
