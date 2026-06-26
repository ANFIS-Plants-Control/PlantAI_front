import { SensorData } from "./SensorData";

export interface DataGroup {
  id: number;
  date: Date;
  mqttClientId: number;
  topicId: number;
  sourceClientId?: string;
  sourceTopic?: string;
  sensorData: SensorData[];
}
