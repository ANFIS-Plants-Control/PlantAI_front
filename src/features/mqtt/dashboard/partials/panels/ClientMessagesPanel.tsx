import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Box, Card, CardHeader, Chip } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

export function ClientMessagesPanel() {
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
          <Box sx={{ display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 2.5, color: "#E18A2C", bgcolor: "#FFF4E5" }}>
            <GroupsOutlinedIcon />
          </Box>
        }
        title="Сообщения, принятые клиентами"
        subheader="Нагрузка на MQTT-клиентов"
        action={<Chip size="small" label="Топ-5" sx={{ mt: 0.75, mr: 1, color: "#A8651E", bgcolor: "#FFF4E5", fontWeight: 700 }} />}
        titleTypographyProps={{ sx: { color: "#214B37", fontSize: "1rem", fontWeight: 800 } }}
        subheaderTypographyProps={{ sx: { color: "#8A9C93", fontSize: "0.72rem" } }}
      />
      <Box sx={{ width: "100%", height: 310 }}>
        <BarChart
          layout="horizontal"
          yAxis={[
            {
              scaleType: "band",
              data: ["sensor-01", "sensor-02", "gateway", "mobile", "analytics"],
              width: 80,
              tickLabelStyle: { fontSize: 10, fill: "#71877C" },
            },
          ]}
          series={[
            { data: [580, 460, 720, 310, 640], label: "Принято", color: "#E18A2C" },
          ]}
          xAxis={[{ height: 28 }]}
          grid={{ horizontal: false, vertical: true }}
          sx={{
            "& .MuiChartsGrid-line": { stroke: "#E5EEE8", strokeDasharray: "4 4" },
            "& .MuiBarElement-root": { rx: 5, ry: 5 },
          }}
        />
      </Box>
    </Card>
  );
}
