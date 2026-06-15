import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import { Box, Card, CardHeader, Chip } from "@mui/material";
import { LineChart } from "@mui/x-charts";

const timeLabels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];

export function MessagesTimelineChart() {
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
          <Box sx={{ display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 2.5, color: "#9B6BD3", bgcolor: "#F3EDFA" }}>
            <ShowChartRoundedIcon />
          </Box>
        }
        title="График сообщений"
        subheader="Интенсивность потока сообщений"
        action={<Chip size="small" label="24 часа" sx={{ mt: 0.75, mr: 1, color: "#7650A5", bgcolor: "#F3EDFA", fontWeight: 700 }} />}
        titleTypographyProps={{ sx: { color: "#214B37", fontSize: "1rem", fontWeight: 800 } }}
        subheaderTypographyProps={{ sx: { color: "#8A9C93", fontSize: "0.72rem" } }}
      />
      <Box sx={{ width: "100%", height: 300, px: 1 }}>
        <LineChart
          xAxis={[{ scaleType: "point", data: timeLabels, tickLabelStyle: { fontSize: 11, fill: "#71877C" } }]}
          series={[
            { data: [120, 84, 310, 540, 460, 620, 280], label: "Входящие", color: "#2E9C69", showMark: false },
            { data: [90, 62, 260, 470, 390, 510, 230], label: "Обработанные", color: "#9B6BD3", showMark: false },
          ]}
          yAxis={[{ width: 48 }]}
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
