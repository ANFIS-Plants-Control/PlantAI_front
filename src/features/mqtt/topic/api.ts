import { get, postQuery } from "../../../utils/api/BaseApiClient";
import { TopicDefinition } from "./models/TopicDefinition";

export async function GetTopicDefinitions(): Promise<TopicDefinition[]> {
  const data = await get<TopicDefinition[]>("/api/Topic");
  if (data !== null) return data;
  return [];
}

export async function CreateTopicDefinition(
  create: string,
): Promise<TopicDefinition> {
  const queryParams = `?topic=${create}`;
  const data = await postQuery<TopicDefinition>("/api/Topic", queryParams);
  if (data !== null) return data;
  return {} as TopicDefinition;
}
