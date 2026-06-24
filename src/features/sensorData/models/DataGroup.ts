import { SensorData } from "./SensorData";

export interface DataGroup {
  id: number;
  date: Date;
  mqttClientId: number;
  topicId: number;
  sensorData: SensorData[];
}
