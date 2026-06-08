import style from "./panel.module.css";
import { Stack } from "@mui/material";
import { Dashboard } from "../../features/mqtt/dashboard/dashboard";
import { useMqttPanelStore } from "./store";
import { PanelComponent } from "./models/PanelComponent";
import { JSX } from "react";
import { Topic } from "../../features/mqtt/topic/topic";
import { Broker } from "../../features/mqtt/broker/broker";
import { MqttClient } from "../../features/mqtt/mqttClient/mqttClient";
import { Menu } from "./partials/menu";

export function ControlPanel() {
  const panelComponent = useMqttPanelStore((s) => s.panelComponent);
  return (
    <div className={style.container}>
      <div className={style.title}>Панель управления MQTT клиентами</div>
      <Stack
        direction="row"
        sx={{
          gap: "32px",
          overflow:"hidden",
          flex: 1
        }}
      >
        <Menu />
        {ControlComponents[panelComponent]}
      </Stack>
    </div>
  );
}

const ControlComponents: Record<PanelComponent, JSX.Element> = {
  Dashboard: <Dashboard />,
  Topics: <Topic />,
  Brokers: <Broker />,
  MqttClients: <MqttClient />,
};
