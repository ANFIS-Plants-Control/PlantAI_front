import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Stats } from "./partials/stats";
import { JSX, useEffect } from "react";
import { useMqttDashboardStore } from "./store";
import { MessagesPerClient } from "./partials/MessagesPerClient";
import { MessagesPerTopic } from "./partials/MessagesPerTopic";
import { AverageSensorDataPerTime } from "./partials/AverageSensorDataPerTime";

export function Dashboard(): JSX.Element {
  const init = useMqttDashboardStore((s) => s.init);
  const initialized = useMqttDashboardStore((s) => s.initialized);
  useEffect(() => {
    init();
  }, [init]);

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
            Актуальное состояние MQTT-инфраструктуры и потоков данных
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshRoundedIcon />}
          onClick={init}
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

      <Stats />
      {initialized ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", xl: "minmax(0, 1.7fr) minmax(22rem, 1fr)" },
            gap: 2.5,
            mt: 2.5,
          }}
        >
          <AverageSensorDataPerTime />
          <Stack sx={{ flexDirection: "column", gap: 2.5, minWidth: 0 }}>
            <MessagesPerClient />
            <MessagesPerTopic />
          </Stack>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            minHeight: 360,
            mt: 2.5,
            border: "1px solid rgba(28,124,84,0.1)",
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.72)",
          }}
        >
          <CircularProgress aria-label="Loading..." />
        </Box>
      )}
    </Box>
  );
}
