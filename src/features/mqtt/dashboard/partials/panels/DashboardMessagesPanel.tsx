import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { DashboardMessage } from "../../models";
import { useMqttDashboardStore } from "../../store";

const statusColors: Record<
  DashboardMessage["status"],
  { color: string; background: string }
> = {
  "требуется вмешательство": {
    color: "#B54708",
    background: "#FFF4E5",
  },
  удовлетворительно: {
    color: "#8A5A00",
    background: "#FFF8D9",
  },
  хорошо: {
    color: "#1C7C54",
    background: "#E8F5EC",
  },
  "вмешательств не требуется": {
    color: "#2F80ED",
    background: "#EAF3FE",
  },
};

function InterventionIcon({
  intervention,
}: {
  intervention: DashboardMessage["intervention"];
}) {
  return intervention === "температура" ? (
    <ThermostatOutlinedIcon fontSize="small" />
  ) : (
    <WaterDropOutlinedIcon fontSize="small" />
  );
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function shouldShowIntervention(message: DashboardMessage) {
  return !message.status.toLowerCase().includes("не требуется");
}

export function DashboardMessagesPanel() {
  const messages = useMqttDashboardStore((s) => s.dashboardMessages);

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid rgba(28,124,84,0.1)",
        borderRadius: 4,
        bgcolor: "rgba(255,255,255,0.84)",
        boxShadow: "0 12px 32px rgba(36,89,61,0.06)",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
          }}
        >
          <Box>
            <Typography
              sx={{ color: "#214B37", fontSize: "1rem", fontWeight: 800 }}
            >
              Сообщения дашборда
            </Typography>
            <Typography
              sx={{ mt: 0.35, color: "#8A9C93", fontSize: "0.72rem" }}
            >
              Периодические статусы и вмешательства
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              width: 42,
              height: 42,
              flex: "0 0 auto",
              borderRadius: 2.5,
              color: "#1C7C54",
              bgcolor: "#E8F5EC",
            }}
          >
            <NotificationsActiveOutlinedIcon />
          </Box>
        </Box>

        <Box sx={{ display: "grid", gap: 1.25 }}>
          {messages.length === 0 ? (
            <Typography sx={{ color: "#71877C", fontSize: "0.84rem" }}>
              Сообщений пока нет
            </Typography>
          ) : (
            messages.map((message) => {
              const colors = statusColors[message.status] ?? {
                color: "#1C7C54",
                background: "#E8F5EC",
              };

              return (
                <Box
                  key={message.id}
                  sx={{
                    display: "grid",
                    gap: 0.85,
                    p: 1.5,
                    border: "1px solid rgba(28,124,84,0.09)",
                    borderRadius: 2,
                    bgcolor: "#FAFCFA",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1.5,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#214B37",
                        fontSize: "0.88rem",
                        fontWeight: 800,
                        overflowWrap: "anywhere",
                      }}
                    >
                      Статус {message.status} ({message.value.toFixed(2)})
                    </Typography>
                    <Chip
                      label={formatTime(message.createdAt)}
                      size="small"
                      sx={{
                        flex: "0 0 auto",
                        height: 24,
                        color: colors.color,
                        bgcolor: colors.background,
                        fontSize: "0.72rem",
                        fontWeight: 800,
                      }}
                    />
                  </Box>
                  {shouldShowIntervention(message) && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        color: "#526D5F",
                      }}
                    >
                      <InterventionIcon intervention={message.intervention} />
                      <Typography
                        sx={{
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          overflowWrap: "anywhere",
                        }}
                      >
                        Вмешательство: {message.intervention}{" "}
                        {message.interventionMinutes}мин
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
