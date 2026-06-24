import { BrokerParameters } from "./models";
import { MqttClient } from "./models/MqttClient";

export function SetClientsStatuses(
  clients: MqttClient[],
  connectedClients: string[],
): MqttClient[] {
  if (connectedClients.length > 0) {
    return clients.map((c) => ({
      ...c,
      isConnected: connectedClients.includes(c.clientId),
    }));
  } else return clients;
}

export function BrokerToAddr(broker: BrokerParameters | undefined) {
  if (broker) return `${broker.host}:${broker.port}`;
}
