import { TopicDefinition } from "./models";
import { BrokerParameters } from "./models/BrokerParameters";
import { Dashboard } from "./models/Dashboard";
import { MqttClient } from "./models/MqttClientModel";

export function SetClientsStatuses(
  clients: MqttClient[],
  subscribedClients: string[],
): MqttClient[] {
  return clients.map((c) => ({
    ...c,
    isSubscribed: subscribedClients.includes(c.clientId),
  }));
}

export function DashboardBuilder(
  clients: MqttClient[],
  brokers: BrokerParameters[],
  topics: TopicDefinition[],
): Dashboard[] {
  return brokers.map(
    (b) =>
      ({
        id: b.id,
        host: b.host,
        port: b.port,
        clients: clients
          .filter((c) => c.brokerId === b.id)
          .map(
            (c) =>
              ({
                ...c,
                topic: topics.find((t) => t.id === c.topicId),
                lastMessageDateTime: new Date(c.lastMessageDateTime),
              }) as MqttClient,
          ),
      }) as Dashboard,
  );
}
