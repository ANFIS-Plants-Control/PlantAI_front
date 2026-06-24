import { Box, CardHeader } from "@mui/material";
import { MqttClient } from "../../models";
import { ManageAccountsIcon } from "../../../../../Shared/icons";
import { useMqttClientStore } from "../../store";
import { useEffect } from "react";

interface IClientCardHeader {
  client: MqttClient;
}

export function ClientCardHeader(client: IClientCardHeader) {
  const synchronize = useMqttClientStore((s) => s.synchronize);
  useEffect(() => {
    synchronize();
  }, [synchronize]);
  return (
    <CardHeader
      avatar={
        <ManageAccountsIcon
          sx={{
            fontSize: "3rem",
            color: "#1C7C54",
          }}
        />
      }
      title={client.client.clientId}
      slotProps={{
        title: {
          sx: {
            fontSize: "1.5rem",
            fontWeight: 700,
          },
        },
      }}
      subheader="MQTT client"
      action={
        <Box
          sx={{
            display: "inline-flex",
            px: 1.5,
            py: 0.5,
            borderRadius: 10,
            fontSize: "1rem",
            fontWeight: 600,
            backgroundColor: client.client.isConnected ? "#dcfce7" : "#fee2e2",
            color: client.client.isConnected ? "#166534" : "#991b1b",
          }}
        >
          {client.client.isConnected ? "Online" : "Offline"}
        </Box>
      }
    />
  );
}
