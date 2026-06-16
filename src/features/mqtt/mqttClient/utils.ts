import { BrokerParameters } from "./models";
import { MqttClient } from "./models/MqttClient";

export function SetClientsStatuses(
  clients: MqttClient[],
  subscribedClients: string[],
): MqttClient[] {
  return clients.map((c) => ({
    ...c,
    isSubscribed: subscribedClients.includes(c.clientId),
  }));
}

export function BrokerToAddr(broker: BrokerParameters | undefined) {
  if (broker) return `${broker.host}:${broker.port}`;
}
