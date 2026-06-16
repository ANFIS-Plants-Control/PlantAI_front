import { TopicDefinition } from "./TopicDefinition";

export interface MqttClient {
  id: number;
  clientId: string;
  topic: TopicDefinition[];
  brokerId: number;
  isSubscribed: boolean;
}
