import { Box, Paper, Typography } from "@mui/material";
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
      caption: "Подключено к системе",
      color: "#2E9C69",
      background: "#E8F5EC",
    },
    {
      title: "Всего подписанных клиентов",
      value: mqttClients.filter((c) => c.isSubscribed).length,
      icon: <Wifi sx={{ fontSize: "2.25rem" }} />,
      caption: "Получают обновления",
      color: "#2F80ED",
      background: "#EAF3FE",
    },
    {
      title: "Всего принятых сообщений",
      value: dataGroups.length,
      icon: <MessageIcon sx={{ fontSize: "2.25rem" }} />,
      caption: "Обработано платформой",
      color: "#9B6BD3",
      background: "#F3EDFA",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
        gap: 2,
      }}
    >
      {blocks.map((b, i) => (
        <Paper
          key={i}
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            p: 2.5,
            border: "1px solid rgba(28,124,84,0.1)",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
            bgcolor: "rgba(255,255,255,0.82)",
            boxShadow: "0 12px 32px rgba(36,89,61,0.06)",
            transition: "transform 180ms ease, box-shadow 180ms ease",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 18px 38px rgba(36,89,61,0.1)",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              width: 80,
              height: 80,
              right: -28,
              top: -30,
              borderRadius: "50%",
              bgcolor: b.background,
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              width: 56,
              height: 56,
              borderRadius: 3,
              backgroundColor: b.background,
              color: b.color,
              flexShrink: 0,
            }}
          >
            {b.icon}
          </Box>

          <Box>
            <Typography sx={{ color: "#71877C", fontSize: "0.78rem", fontWeight: 600 }}>
              {b.title}
            </Typography>
            <Typography
              sx={{
                mt: 0.25,
                color: "#183E2D",
                fontSize: "2rem",
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              {b.value}
            </Typography>
            <Typography sx={{ mt: 0.4, color: "#9AA9A1", fontSize: "0.7rem" }}>
              {b.caption}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
