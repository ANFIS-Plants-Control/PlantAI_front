import { DataGroup } from "./DataGroup";
import { SensorData } from "./SensorData";

export type IncomingSensorData = Partial<SensorData> & {
  Id?: number;
  Value?: number;
  SensorTypeId?: number;
  DataGroupId?: number;
  NetworkResponse?: number;
};

export interface SensorDataSignalRPayload extends Partial<DataGroup> {
  Id?: number | string;
  Date?: Date | string;
  MqttClientId?: number | string;
  TopicId?: number | string;
  ClientId?: string;
  clientId?: string;
  Topic?: string;
  topic?: string;
  dataGroup?: DataGroup;
  DataGroup?: DataGroup;
  sensorData?: IncomingSensorData[];
  SensorsData?: IncomingSensorData[];
  sensorsData?: IncomingSensorData[];
}
