import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { JSX, useEffect } from "react";
import { MessagesByRoutePanel } from "./partials/panels/MessagesByRoutePanel";
import { ResourceSummary } from "./partials/panels/ResourceSummary";
import { SensorMetricsChart } from "./partials/panels/SensorMetricsChart";
import { SystemHealthCard } from "./partials/panels/SystemHealthCard";
import { useMqttDashboardStore } from "./store";
import { MessagesPerClient } from "./partials/panels/MessagesPerClient";
import { MessagesPerTopic } from "./partials/panels/MessagesPerTopic";
import { DashboardMessagesPanel } from "./partials/panels/DashboardMessagesPanel";

const dashboardMessagePeriodMs = 30000;

export function Dashboard(): JSX.Element {
  const pushDashboardMessage = useMqttDashboardStore(
    (s) => s.pushDashboardMessage,
  );

  const init = useMqttDashboardStore((s) => s.init);
  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    pushDashboardMessage();
    const intervalId = window.setInterval(
      pushDashboardMessage,
      dashboardMessagePeriodMs,
    );

    return () => window.clearInterval(intervalId);
  }, [pushDashboardMessage]);

  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        flexGrow: 1,
        minWidth: 0,
        px: { xs: 1.5, md: 3 },
        pb: 4,
      }}
    >
      <Stack
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography
            component="h2"
            sx={{
              color: "#183E2D",
              fontSize: { xs: "1.75rem", md: "2.25rem" },
              fontWeight: 800,
              letterSpacing: "-0.045em",
            }}
          >
            Обзор системы
          </Typography>
          <Typography sx={{ mt: 0.5, color: "#71877C", fontSize: "0.9rem" }}>
            Состояние MQTT-инфраструктуры, датчиков и потоков данных
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshRoundedIcon />}
          sx={{
            color: "#1C7C54",
            bgcolor: "#E8F5EC",
            border: "1px solid rgba(28,124,84,0.12)",
            borderRadius: 2.5,
            fontWeight: 700,
            textTransform: "none",
            "&:hover": {
              borderColor: "rgba(28,124,84,0.3)",
              bgcolor: "#DDF0E3",
            },
          }}
        >
          Обновить данные
        </Button>
      </Stack>

      <ResourceSummary />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            xl: "minmax(0, 2fr) minmax(20rem, 1fr)",
          },
          gap: 2.5,
          mt: 2.5,
        }}
      >
        <SensorMetricsChart />
        <Box sx={{ display: "grid", gap: 2.5 }}>
          <SystemHealthCard />
          <DashboardMessagesPanel />
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", xl: "repeat(2, minmax(0, 1fr))" },
          gap: 2.5,
          mt: 2.5,
        }}
      >
        <MessagesByRoutePanel />
        <MessagesPerClient />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", xl: "repeat(2, minmax(0, 1fr))" },
          gap: 2.5,
          mt: 2.5,
        }}
      >
        <MessagesPerTopic />
      </Box>
    </Box>
  );
}
