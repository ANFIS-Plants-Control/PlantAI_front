import { Box, Paper, Stack, Typography } from "@mui/material";
import { useMqttDashboardStore } from "../store";
import MessageIcon from "@mui/icons-material/Message";
import GroupsIcon from "@mui/icons-material/Groups";
import { Wifi } from "@mui/icons-material";

export function Stats() {
  const mqttClients = useMqttDashboardStore((s) => s.mqttClients);
  const dataGroups = useMqttDashboardStore((s) => s.dataGroups);
  const blocks = [
    {
      title: "Всего клиентов",
      value: mqttClients.length,
      icon: <GroupsIcon sx={{ fontSize: "2.25rem" }} />,
    },
    {
      title: "Всего подписанных клиентов",
      value: mqttClients.filter((c) => c.isSubscribed).length,
      icon: <Wifi sx={{ fontSize: "2.25rem" }} />,
    },
    {
      title: "Всего принятых сообщений",
      value: dataGroups.length,
      icon: <MessageIcon sx={{ fontSize: "2.25rem" }} />,
    },
  ];

  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        justifyContent: "center",
        gap: "3rem",
        mb: "1rem",
        flexWrap: "wrap",
      }}
    >
      {blocks.map((b, i) => (
        <Paper
          key={i}
          elevation={2}
          sx={{
            minWidth: 280,
            p: "1.5rem",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <Box
            sx={{
              width: "5rem",
              height: "5rem",
              borderRadius: "50%",
              backgroundColor: "#E8F5EC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#22C55E",
              flexShrink: 0,
            }}
          >
            {b.icon}
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              {b.title}
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {b.value}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
}
