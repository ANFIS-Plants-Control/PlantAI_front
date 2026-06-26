import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import ThermostatRoundedIcon from "@mui/icons-material/ThermostatRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";

type ControlUnit = "humidity" | "temperature";

interface ControlUnitInfo {
  title: string;
  description: string;
  isOnline: boolean;
  icon: ReactNode;
  color: string;
  background: string;
}

const controlUnits: Record<ControlUnit, ControlUnitInfo> = {
  humidity: {
    title: "Влажность",
    description: "Контроль системы увлажнения",
    isOnline: true,
    icon: <WaterDropRoundedIcon />,
    color: "#2F80ED",
    background: "#EAF3FE",
  },
  temperature: {
    title: "Температура",
    description: "Контроль температурного режима",
    isOnline: false,
    icon: <ThermostatRoundedIcon />,
    color: "#E18A2C",
    background: "#FFF4E5",
  },
};

export function Control() {
  const [enabledUnits, setEnabledUnits] = useState<Record<ControlUnit, boolean>>({
    humidity: true,
    temperature: false,
  });

  const setUnitEnabled = (unit: ControlUnit, isEnabled: boolean) => {
    setEnabledUnits((currentState) => ({
      ...currentState,
      [unit]: isEnabled,
    }));
  };

  const units = (Object.keys(controlUnits) as ControlUnit[]).map((unit) => ({
    unit,
    ...controlUnits[unit],
    isEnabled: enabledUnits[unit],
  }));

  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
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
            }}
          >
            Управление
          </Typography>
          <Typography sx={{ mt: 0.5, color: "#71877C", fontSize: "0.9rem" }}>
            Ручное управление климатическими блоками
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, minmax(0, 1fr))" },
          gap: 2.5,
        }}
      >
        {units.map((unit) => (
          <Card
            key={unit.unit}
            elevation={0}
            sx={{
              minWidth: 0,
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
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 2,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    minWidth: 0,
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
                      color: unit.color,
                      bgcolor: unit.background,
                    }}
                  >
                    {unit.icon}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        color: "#214B37",
                        fontSize: "1.15rem",
                        fontWeight: 800,
                      }}
                    >
                      {unit.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#71877C",
                        fontSize: "0.82rem",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {unit.description}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={unit.isOnline ? "Онлайн" : "Оффлайн"}
                  size="small"
                  sx={{
                    color: unit.isOnline ? "#1C7C54" : "#8A5A00",
                    bgcolor: unit.isOnline ? "#E8F5EC" : "#FFF4E5",
                    fontWeight: 800,
                  }}
                />
              </Box>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                gap={1.25}
                sx={{ alignItems: { xs: "stretch", sm: "center" } }}
              >
                <Button
                  variant="contained"
                  startIcon={<PowerSettingsNewRoundedIcon />}
                  disabled={unit.unit === "temperature" || unit.isEnabled}
                  onClick={() => setUnitEnabled(unit.unit, true)}
                  sx={{
                    bgcolor: "#1C7C54",
                    textTransform: "none",
                    fontWeight: 800,
                    "&:hover": { bgcolor: "#176846" },
                  }}
                >
                  Включить
                </Button>
                <Button
                  variant="outlined"
                  disabled={unit.unit === "temperature" || !unit.isEnabled}
                  onClick={() => setUnitEnabled(unit.unit, false)}
                  sx={{
                    color: "#D9534F",
                    borderColor: "rgba(217,83,79,0.3)",
                    textTransform: "none",
                    fontWeight: 800,
                    "&:hover": {
                      borderColor: "rgba(217,83,79,0.55)",
                      bgcolor: "#FDECEC",
                    },
                  }}
                >
                  Выключить
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
