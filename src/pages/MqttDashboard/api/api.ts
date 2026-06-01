import { telemetry_host } from "../../../utils/consts";
import { Dashboard } from "../models/Dashboard";

export async function GetDashboard(): Promise<Dashboard[]> {
  try {
    const response = await fetch(
      `${telemetry_host}/api/MqttClients/dashboard`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    if (!response.ok) throw new Error("error fetching mqtt clients");
    else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function Synchronize() {
  try {
    const response = await fetch(
      `${telemetry_host}/api/MqttClients/synchronize`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    if (!response.ok) throw new Error("error fetching mqtt clients");
    else {
      const message = await response.json();
      console.log(`${message}`);
    }
  } catch (error) {
    console.log(error);
  }
  return [];
}
