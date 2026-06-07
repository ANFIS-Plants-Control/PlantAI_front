import { TopicDefinition } from "./TopicDefinition";

export interface MqttClient {
  id: number;
  clientId: string;
  topicId: number;
  topic: TopicDefinition;
  brokerId: number;
  lastMessageDateTime: Date;
  isSubscribed: boolean;
}
