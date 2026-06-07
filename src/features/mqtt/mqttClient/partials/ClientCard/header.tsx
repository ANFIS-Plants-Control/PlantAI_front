import { Box, CardHeader } from "@mui/material";
import { MqttClient } from "../../models";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

interface IClientCardHeader {
  client: MqttClient;
}

export function ClientCardHeader(client: IClientCardHeader) {
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
            backgroundColor: client.client.isSubscribed ? "#dcfce7" : "#fee2e2",
            color: client.client.isSubscribed ? "#166534" : "#991b1b",
          }}
        >
          {client.client.isSubscribed ? "Subscribed" : "Offline"}
        </Box>
      }
    />
  );
}
