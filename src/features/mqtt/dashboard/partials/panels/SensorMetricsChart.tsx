import SensorsOutlinedIcon from "@mui/icons-material/SensorsOutlined";
import { Box, Button, Card, CardHeader } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useMqttDashboardStore } from "../../store";
import dayjs from "dayjs";
import { useState } from "react";

const chartPointsLimit = 30;

const sensorSeries: Record<number, { label: string; color: string }> = {
  1: { label: "Температура, °C", color: "#E18A2C" },
  2: { label: "Влажность, %", color: "#2F80ED" },
  3: { label: "CO2", color: "#2FED2F" },
};

export function SensorMetricsChart() {
  const [sensorType, setSensorType] = useState<number>(1);

  const dataGroups = useMqttDashboardStore((s) => s.dataGroups);
  const sensorDatas = useMqttDashboardStore((s) => s.sensorDatas);

  const sensorTypes = Array.from(
    new Set(sensorDatas.map((data) => data.sensorTypeId)),
  ).sort((a, b) => a - b);
  const activeSensorType = sensorTypes.includes(sensorType)
    ? sensorType
    : (sensorTypes[0] ?? sensorType);

  const dataGroupDates = new Map(
    dataGroups.map((dataGroup) => [dataGroup.id, dataGroup.date]),
  );
  const chartData = sensorDatas
    .filter((data) => data.sensorTypeId === activeSensorType)
    .reduce<{ value: number; date: Date }[]>((result, data, index) => {
      const date = dataGroupDates.get(data.dataGroupId);
      const timestamp = dayjs(date).valueOf();

      if (Number.isFinite(timestamp)) {
        result.push({
          value: data.value,
          date: new Date(timestamp + index),
        });
      }

      return result;
    }, [])
    .sort((first, second) => first.date.getTime() - second.date.getTime())
    .slice(-chartPointsLimit);
  const timeLabels = chartData.map((point) => point.date);
  const values = chartData.map((point) => point.value);
  const activeSeries = sensorSeries[activeSensorType] ?? {
    label: `Тип датчика ${activeSensorType}`,
    color: "#2E9C69",
  };

  const changeSensorType = () => {
    if (sensorTypes.length < 2) return;

    const currentIndex = sensorTypes.indexOf(activeSensorType);
    const nextIndex = (currentIndex + 1) % sensorTypes.length;
    setSensorType(sensorTypes[nextIndex]);
  };

  return (
    <Card
      elevation={0}
      sx={{
        minWidth: 0,
        border: "1px solid rgba(28,124,84,0.1)",
        borderRadius: 4,
        bgcolor: "rgba(255,255,255,0.84)",
        boxShadow: "0 12px 32px rgba(36,89,61,0.06)",
      }}
    >
      <CardHeader
        avatar={
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
            <SensorsOutlinedIcon />
          </Box>
        }
        title="Показатели датчиков"
        subheader="Изменение значений в течение дня"
        action={
          <Button
            sx={{
              mt: 0.75,
              mr: 1,
              color: "#1C7C54",
              bgcolor: "#E8F5EC",
              fontWeight: 700,
            }}
            disabled={sensorTypes.length < 2}
            onClick={changeSensorType}
          >
            Сменить тип данных
          </Button>
        }
        titleTypographyProps={{
          sx: { color: "#214B37", fontSize: "1rem", fontWeight: 800 },
        }}
        subheaderTypographyProps={{
          sx: { color: "#8A9C93", fontSize: "0.72rem" },
        }}
      />
      <Box sx={{ width: "100%", height: 330, px: 1 }}>
        <LineChart
          xAxis={[
            {
              scaleType: "time",
              data: timeLabels,
              valueFormatter: (date) => dayjs(date).format("HH:mm:ss"),
              tickLabelStyle: { fontSize: 11, fill: "#71877C" },
            },
          ]}
          series={[
            {
              data: values,
              label: activeSeries.label,
              color: activeSeries.color,
              showMark: false,
            },
          ]}
          yAxis={[{ width: 42 }]}
          grid={{ horizontal: true, vertical: false }}
          sx={{
            "& .MuiChartsGrid-line": {
              stroke: "#E5EEE8",
              strokeDasharray: "4 4",
            },
            "& .MuiLineElement-root": { strokeWidth: 2.5 },
          }}
        />
      </Box>
    </Card>
  );
}
