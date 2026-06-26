import style from "./panel.module.css";
import { Box, Stack } from "@mui/material";
import { Dashboard } from "../../features/mqtt/dashboard/dashboard";
import { useMqttPanelStore } from "./store";
import { PanelComponent } from "./models/PanelComponent";
import { JSX, useEffect, useState } from "react";
import { Topic } from "../../features/mqtt/topic/topic";
import { Broker } from "../../features/mqtt/broker/broker";
import { MqttClient } from "../../features/mqtt/mqttClient/mqttClient";
import { Menu } from "./partials/menu";
import { SensorData } from "../../features/sensorData/sensorData";
import { Control } from "./Control";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { SensorDataSignalRPayload } from "../../features/mqtt/dashboard/models";
import { useMqttDashboardStore } from "../../features/mqtt/dashboard/store";
import { useSensorDataStore } from "../../features/sensorData/store";

export function ControlPanel() {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const panelComponent = useMqttPanelStore((s) => s.panelComponent);
  const updateDashboardSensorData = useMqttDashboardStore(
    (s) => s.updateSensorsData,
  );
  const updateSensorDataTable = useSensorDataStore(
    (s) => s.updateSensorsData,
  );

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5259/sensorDataSoket")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (!connection) return;

    connection
      .start()
      .then(() => {
        connection.on("Receive", (data: SensorDataSignalRPayload) => {
          updateDashboardSensorData(data);
          updateSensorDataTable(data);
        });
      })
      .catch((error) => console.error("Connection failed: ", error));

    return () => {
      connection.off("Receive");
      connection.stop();
    };
  }, [connection, updateDashboardSensorData, updateSensorDataTable]);

  return (
    <div className={style.container}>
      <Stack
        direction="row"
        sx={{
          width: "100%",
          gap: 2.5,
          overflow: "hidden",
          flex: 1,
          height: "100%",
          minHeight: 0,
          minWidth: 0,
        }}
      >
        <Menu />
        <Box
          sx={{
            flex: "1 1 auto",
            minWidth: 0,
            minHeight: 0,
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            boxSizing: "border-box",
          }}
        >
          {ControlComponents[panelComponent]}
        </Box>
      </Stack>
    </div>
  );
}

const ControlComponents: Record<PanelComponent, JSX.Element> = {
  Dashboard: <Dashboard />,
  SensorData: <SensorData />,
  Control: <Control />,
  Topics: <Topic />,
  Brokers: <Broker />,
  MqttClients: <MqttClient />,
};
