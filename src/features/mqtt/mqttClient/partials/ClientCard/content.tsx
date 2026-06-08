import { Box, CardContent, Stack, Typography } from "@mui/material";
import { BrokerToAddr } from "../../utils";
import { useMqttClientStore } from "../../store";
import { MqttClient } from "../../models";

interface IClientCardContent {
  client: MqttClient;
}

export function ClientCardContent(client: IClientCardContent) {
  const brokers = useMqttClientStore((s) => s.brokers);
  return (
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Linked broker
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, fontSize: "1.5rem" }}
        >
          {BrokerToAddr(brokers.find((b) => b.id === client.client.brokerId))}
        </Typography>
      </Box>
      <Box sx={{ height: 80 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Linked topics
        </Typography>
        <Stack
          direction="row"
          sx={{
            flexWrap: "wrap",
            gap: 1,
            maxHeight: 90,
            overflowY: "auto",
          }}
        >
          {client.client.topics.map((t) => (
            <Box
              key={t.id}
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 10,
                backgroundColor: "#463d3d15",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              {t.topic}
            </Box>
          ))}
        </Stack>
      </Box>
    </CardContent>
  );
}
