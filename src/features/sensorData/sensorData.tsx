import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { SensorDataTable } from "./partials/table";
import { useSensorDataStore } from "./store";

export function SensorData() {
  const init = useSensorDataStore((state) => state.init);
  const initialized = useSensorDataStore((state) => state.initialized);

  useEffect(() => {
    if (!initialized) init();
  }, [init, initialized]);

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
            Данные датчиков
          </Typography>
          <Typography sx={{ mt: 0.5, color: "#71877C", fontSize: "0.9rem" }}>
            История измерений и качество ответа сети
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

      <SensorDataTable />
    </Box>
  );
}
