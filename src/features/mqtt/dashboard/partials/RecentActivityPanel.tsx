import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

const activities = [
  {
    title: "Получено новое сообщение",
    description: "greenhouse/temperature",
    time: "2 мин назад",
    icon: <MailOutlineRoundedIcon />,
    color: "#2E9C69",
    background: "#E8F5EC",
  },
  {
    title: "Подключён MQTT-клиент",
    description: "sensor-hub-04",
    time: "8 мин назад",
    icon: <GroupsOutlinedIcon />,
    color: "#2F80ED",
    background: "#EAF3FE",
  },
  {
    title: "Обновлена подписка",
    description: "plants/+/humidity",
    time: "21 мин назад",
    icon: <TopicOutlinedIcon />,
    color: "#9B6BD3",
    background: "#F3EDFA",
  },
  {
    title: "Брокер снова доступен",
    description: "greenhouse-main",
    time: "34 мин назад",
    icon: <DnsOutlinedIcon />,
    color: "#E18A2C",
    background: "#FFF4E5",
  },
];

export function RecentActivityPanel() {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: "1px solid rgba(28,124,84,0.1)",
        borderRadius: 4,
        bgcolor: "rgba(255,255,255,0.84)",
        boxShadow: "0 12px 32px rgba(36,89,61,0.06)",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography sx={{ color: "#214B37", fontSize: "1rem", fontWeight: 800 }}>
          Последняя активность
        </Typography>
        <Typography sx={{ mt: 0.35, mb: 1.5, color: "#8A9C93", fontSize: "0.72rem" }}>
          Последние события инфраструктуры
        </Typography>

        {activities.map((activity, index) => (
          <Box key={activity.title}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1.2 }}>
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  width: 38,
                  height: 38,
                  flex: "0 0 auto",
                  borderRadius: 2.5,
                  color: activity.color,
                  bgcolor: activity.background,
                }}
              >
                {activity.icon}
              </Box>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography sx={{ color: "#365846", fontSize: "0.78rem", fontWeight: 800 }}>
                  {activity.title}
                </Typography>
                <Typography noWrap sx={{ mt: 0.2, color: "#8A9C93", fontSize: "0.68rem" }}>
                  {activity.description}
                </Typography>
              </Box>
              <Typography sx={{ flex: "0 0 auto", color: "#A2AFA8", fontSize: "0.65rem" }}>
                {activity.time}
              </Typography>
            </Box>
            {index < activities.length - 1 && <Divider sx={{ borderColor: "#EEF3F0" }} />}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
