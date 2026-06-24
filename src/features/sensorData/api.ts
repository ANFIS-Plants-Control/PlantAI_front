import { get } from "../../utils/api/BaseApiClient";
import { DataGroup, SensorData } from "./models";

export async function GetDataGroups(): Promise<DataGroup[]> {
  const data = await get<DataGroup[]>("/api/SensorData/data-groups");
  return data ?? [];
}

export async function GetSensorData(): Promise<SensorData[]> {
  const data = await get<SensorData[]>("/api/SensorData");
  return data ?? [];
}
