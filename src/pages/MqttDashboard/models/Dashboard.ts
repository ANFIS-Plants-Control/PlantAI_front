import { MqttClient } from "./MqttClientModel";

export interface Dashboard {
  id: number;
  host: string;
  port: string;
  clients: MqttClient[];
}
