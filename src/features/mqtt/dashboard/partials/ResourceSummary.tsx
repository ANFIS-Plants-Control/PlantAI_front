import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import { Box, Paper, Typography } from "@mui/material";
import { useMqttDashboardStore } from "../store";

export function ResourceSummary() {
  const clients = useMqttDashboardStore((s) => s.mqttClients);
  const brokers = useMqttDashboardStore((s) => s.brokers);
  const topics = useMqttDashboardStore((s) => s.topics);
  const dataGroups = useMqttDashboardStore((s) => s.dataGroups);

  const resources = [
    {
      title: "MQTT клиенты",
      value: clients.length,
      icon: <GroupsOutlinedIcon />,
      color: "#2E9C69",
      background: "#E8F5EC",
    },
    {
      title: "Брокеры",
      value: brokers.length,
      icon: <DnsOutlinedIcon />,
      color: "#2F80ED",
      background: "#EAF3FE",
    },
    {
      title: "Топики",
      value: topics.length,
      icon: <TopicOutlinedIcon />,
      color: "#9B6BD3",
      background: "#F3EDFA",
    },
    {
      title: "Сообщения",
      value: dataGroups.length,
      icon: <MailOutlineRoundedIcon />,
      color: "#E18A2C",
      background: "#FFF4E5",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          xl: "repeat(4, minmax(0, 1fr))",
        },
        gap: 2,
      }}
    >
      {resources.map((resource) => (
        <Paper
          key={resource.title}
          elevation={0}
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 2,
            overflow: "hidden",
            p: 2.25,
            border: "1px solid rgba(28,124,84,0.1)",
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.84)",
            boxShadow: "0 12px 32px rgba(36,89,61,0.06)",
            "&::after": {
              content: '""',
              position: "absolute",
              width: 76,
              height: 76,
              top: -30,
              right: -28,
              borderRadius: "50%",
              bgcolor: resource.background,
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              width: 52,
              height: 52,
              flex: "0 0 auto",
              borderRadius: 3,
              color: resource.color,
              bgcolor: resource.background,
            }}
          >
            {resource.icon}
          </Box>
          <Box>
            <Typography
              sx={{ color: "#71877C", fontSize: "0.76rem", fontWeight: 700 }}
            >
              {resource.title}
            </Typography>
            <Typography
              sx={{
                color: "#183E2D",
                fontSize: "1.8rem",
                fontWeight: 800,
                lineHeight: 1.15,
              }}
            >
              {resource.value}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
