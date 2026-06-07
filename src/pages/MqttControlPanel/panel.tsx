import style from "./panel.module.css";
import { Stack } from "@mui/material";
import { Dashboard } from "../../features/mqtt/dashboard/dashboard";
import { StyledPanelBox } from "./partials/styles";
import { useMqttPanelStore } from "./store";
import { PanelComponent } from "./models/PanelComponent";
import { JSX } from "react";
import { Topic } from "../../features/mqtt/topic/topic";
import { Broker } from "../../features/mqtt/broker/broker";
import { MqttClient } from "../../features/mqtt/mqttClient/mqttClient";

export function MqttControlPanel() {
  const panelComponent = useMqttPanelStore((s) => s.panelComponent);
  const setPanelComponent = useMqttPanelStore((s) => s.setPanelComponent);
  const panelBlockButtons: PanelComponent[] = [
    "Dashboard",
    "Topics",
    "Brokers",
    "Clients",
  ];
  return (
    <div className={style.container}>
      <div className={style.title}>Панель управления MQTT клиентами</div>
      <Stack
        direction="row"
        sx={{
          minHeight: "80vh",
          gap: "32px",
        }}
      >
        <Stack
          sx={{
            width: 250,
            backgroundColor: "#1C7C54",
            flexShrink: 0,
          }}
        >
          {panelBlockButtons.map((b, i) => (
            <StyledPanelBox key={i} onClick={(e) => setPanelComponent(b)}>
              {b}
            </StyledPanelBox>
          ))}
        </Stack>
        {ControlComponents[panelComponent]}
      </Stack>
    </div>
  );
}

const ControlComponents: Record<PanelComponent, JSX.Element> = {
  Dashboard: <Dashboard />,
  Topics: <Topic />,
  Brokers: <Broker />,
  Clients: <MqttClient />,
};
