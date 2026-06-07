import { get, postBody } from "../../../utils/api/BaseApiClient";
import { BrokerParameters, CreateBroker } from "./models/BrokerParameters";

export async function GetBrokers(): Promise<BrokerParameters[]> {
  const data = await get<BrokerParameters[]>("/api/BrokerParameters");
  if (data !== null) return data;
  return [];
}

export async function CreatBroker(
  broker: CreateBroker,
): Promise<BrokerParameters> {
  const data = await postBody<CreateBroker, BrokerParameters>(
    "/api/BrokerParameters",
    broker,
  );
  if (data !== null) return data;
  return {} as BrokerParameters;
}
