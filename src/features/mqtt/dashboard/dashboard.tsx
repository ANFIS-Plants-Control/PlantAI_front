import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { JSX } from "react";
import { ClientMessagesPanel } from "./partials/ClientMessagesPanel";
import { MessagesByRoutePanel } from "./partials/MessagesByRoutePanel";
import { MessagesTimelineChart } from "./partials/MessagesTimelineChart";
import { RecentActivityPanel } from "./partials/RecentActivityPanel";
import { ResourceSummary } from "./partials/ResourceSummary";
import { SensorMetricsChart } from "./partials/SensorMetricsChart";
import { SystemHealthCard } from "./partials/SystemHealthCard";

export function Dashboard(): JSX.Element {
  return (
    <Box
      sx={{
        width: "100%",
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
          gridTemplateColumns: { xs: "1fr", xl: "minmax(0, 2fr) minmax(20rem, 1fr)" },
          gap: 2.5,
          mt: 2.5,
        }}
      >
        <SensorMetricsChart />
        <SystemHealthCard />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", xl: "repeat(2, minmax(0, 1fr))" },
          gap: 2.5,
          mt: 2.5,
        }}
      >
        <MessagesTimelineChart />
        <RecentActivityPanel />
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
        <ClientMessagesPanel />
      </Box>
    </Box>
  );
}
