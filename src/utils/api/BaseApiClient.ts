import { telemetry_host } from "../../Shared/consts";

export async function get<T>(addr: string): Promise<T | null> {
  try {
    const response = await fetch(`${telemetry_host}${addr}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!response.ok) throw new Error(`error data from ${telemetry_host}`);
    else {
      const data: T = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function postBody<T, K>(addr: string, body: T): Promise<K> {
  try {
    const response = await fetch(`${telemetry_host}${addr}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error("error fetching mqtt clients");
    else {
      const data: K = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
  return {} as K;
}

export async function postEmpty(addr: string): Promise<string> {
  try {
    const response = await fetch(`${telemetry_host}${addr}}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!response.ok) throw new Error("error fetching mqtt clients");
    else {
      const message = await response.json();
      return message;
    }
  } catch (error) {
    console.log(error);
  }
  return "";
}

export async function postQuery<T>(addr: string, params: string): Promise<T> {
  try {
    const response = await fetch(`${telemetry_host}${addr}${params}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!response.ok) throw new Error("error fetching mqtt clients");
    else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
  return {} as T;
}
