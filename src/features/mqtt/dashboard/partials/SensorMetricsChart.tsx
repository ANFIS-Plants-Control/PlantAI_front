import SensorsOutlinedIcon from "@mui/icons-material/SensorsOutlined";
import { Box, Card, CardHeader, Chip } from "@mui/material";
import { LineChart } from "@mui/x-charts";

const timeLabels = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

export function SensorMetricsChart() {
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
          <Box sx={{ display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 2.5, color: "#1C7C54", bgcolor: "#E8F5EC" }}>
            <SensorsOutlinedIcon />
          </Box>
        }
        title="Показатели датчиков"
        subheader="Изменение значений в течение дня"
        action={<Chip size="small" label="Сегодня" sx={{ mt: 0.75, mr: 1, color: "#1C7C54", bgcolor: "#E8F5EC", fontWeight: 700 }} />}
        titleTypographyProps={{ sx: { color: "#214B37", fontSize: "1rem", fontWeight: 800 } }}
        subheaderTypographyProps={{ sx: { color: "#8A9C93", fontSize: "0.72rem" } }}
      />
      <Box sx={{ width: "100%", height: 330, px: 1 }}>
        <LineChart
          xAxis={[{ scaleType: "point", data: timeLabels, tickLabelStyle: { fontSize: 11, fill: "#71877C" } }]}
          series={[
            { data: [22, 23, 25, 27, 26, 24, 23], label: "Температура, °C", color: "#E18A2C", showMark: false },
            { data: [58, 57, 54, 52, 55, 59, 61], label: "Влажность, %", color: "#2F80ED", showMark: false },
            { data: [44, 46, 49, 48, 51, 53, 52], label: "Влажность почвы, %", color: "#2E9C69", showMark: false },
          ]}
          yAxis={[{ width: 42 }]}
          grid={{ horizontal: true, vertical: false }}
          sx={{
            "& .MuiChartsGrid-line": { stroke: "#E5EEE8", strokeDasharray: "4 4" },
            "& .MuiLineElement-root": { strokeWidth: 2.5 },
          }}
        />
      </Box>
    </Card>
  );
}
