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
  Id?: number;
  Date?: Date | string;
  MqttClientId?: number;
  TopicId?: number;
  dataGroup?: DataGroup;
  DataGroup?: DataGroup;
  sensorData?: IncomingSensorData[];
  SensorsData?: IncomingSensorData[];
  sensorsData?: IncomingSensorData[];
}
