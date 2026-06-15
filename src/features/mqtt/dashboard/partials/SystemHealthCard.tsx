import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Box, Card, CardContent, LinearProgress, Typography } from "@mui/material";

const healthItems = [
  {
    title: "Активные клиенты",
    value: "21 из 24",
    progress: 88,
    icon: <GroupsOutlinedIcon />,
    color: "#2E9C69",
  },
  {
    title: "Доступные брокеры",
    value: "6 из 6",
    progress: 100,
    icon: <DnsOutlinedIcon />,
    color: "#2F80ED",
  },
];

export function SystemHealthCard() {
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
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
          <Box>
            <Typography sx={{ color: "#214B37", fontSize: "1rem", fontWeight: 800 }}>
              Здоровье системы
            </Typography>
            <Typography sx={{ mt: 0.35, color: "#8A9C93", fontSize: "0.72rem" }}>
              Доступность инфраструктуры
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              width: 42,
              height: 42,
              borderRadius: 2.5,
              color: "#1C7C54",
              bgcolor: "#E8F5EC",
            }}
          >
            <CheckCircleOutlineRoundedIcon />
          </Box>
        </Box>

        <Box sx={{ display: "grid", gap: 2.25 }}>
          {healthItems.map((item) => (
            <Box key={item.title}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.8 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ display: "flex", color: item.color }}>{item.icon}</Box>
                  <Typography sx={{ color: "#526D5F", fontSize: "0.78rem", fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                </Box>
                <Typography sx={{ color: "#214B37", fontSize: "0.78rem", fontWeight: 800 }}>
                  {item.value}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={item.progress}
                sx={{
                  height: 7,
                  borderRadius: 999,
                  bgcolor: "#EDF3EF",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 999,
                    bgcolor: item.color,
                  },
                }}
              />
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            mt: 2.5,
            p: 1.5,
            borderRadius: 3,
            color: "#1C7C54",
            bgcolor: "#F0F8F2",
            fontSize: "0.75rem",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Все ключевые сервисы работают стабильно
        </Box>
      </CardContent>
    </Card>
  );
}
