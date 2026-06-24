import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import { Box, Card, CardHeader, Chip } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useMqttDashboardStore } from "../../store";
import { MqttClient } from "../../models";

export function MessagesByRoutePanel() {
  const brokers = useMqttDashboardStore((s) => s.brokers);
  const clients = useMqttDashboardStore((s) => s.mqttClients);
  const dataGroups = useMqttDashboardStore((s) => s.dataGroups);
  console.log(brokers);
  console.log(clients);
  console.log(dataGroups);
  const chartData = brokers.map((b) => ({
    xAxis: `${b.host}:${b.port}`,
    yAxis: dataGroups.filter((x) =>
      clients
        .filter((x) => x.brokerId === b.id)
        .includes(
          clients?.find((c) => c.id === x.mqttClientId) || ({} as MqttClient),
        ),
    ).length,
  }));

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
              color: "#2F80ED",
              bgcolor: "#EAF3FE",
            }}
          >
            <AccountTreeOutlinedIcon />
          </Box>
        }
        title="Сообщения по брокерам"
        subheader="Сравнение пропущенного трафика"
        action={
          <Chip
            size="small"
            label="Последний час"
            sx={{
              mt: 0.75,
              mr: 1,
              color: "#2F6EBA",
              bgcolor: "#EAF3FE",
              fontWeight: 700,
            }}
          />
        }
        titleTypographyProps={{
          sx: { color: "#214B37", fontSize: "1rem", fontWeight: 800 },
        }}
        subheaderTypographyProps={{
          sx: { color: "#8A9C93", fontSize: "0.72rem" },
        }}
      />
      <Box sx={{ width: "100%", height: 310 }}>
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: chartData.map((d) => d.xAxis),
              tickLabelStyle: { fontSize: 10, fill: "#71877C" },
            },
          ]}
          series={[
            {
              data: chartData.map((d) => d.yAxis),
              label: "Сообщения",
              color: "#2F80ED",
            },
          ]}
          yAxis={[{ width: 48 }]}
          grid={{ horizontal: true, vertical: false }}
          sx={{
            "& .MuiChartsGrid-line": {
              stroke: "#E5EEE8",
              strokeDasharray: "4 4",
            },
            "& .MuiBarElement-root": { rx: 5, ry: 5 },
          }}
        />
      </Box>
    </Card>
  );
}
