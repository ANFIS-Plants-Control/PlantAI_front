import { TopicDefinition } from "./TopicDefinition";

export interface MqttClient {
  clientId: string;
  topic: TopicDefinition;
}

export interface EditMqttClient{
  clientId: string;
  topicId: number;
  brokerId: number;
}

export interface SubscribeMqttClient {
  ClientId: string;
  Topic: string;
}
