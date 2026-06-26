import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import { Box, Card, CardHeader, Chip } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataGroup, MqttClient } from "../../models";
import { useMqttDashboardStore } from "../../store";

function isGroupFromClient(group: DataGroup, client: MqttClient) {
  return (
    group.mqttClientId === client.id ||
    (!!group.sourceClientId && group.sourceClientId === client.clientId)
  );
}

export function MessagesByRoutePanel() {
  const brokers = useMqttDashboardStore((s) => s.brokers);
  const clients = useMqttDashboardStore((s) => s.mqttClients);
  const dataGroups = useMqttDashboardStore((s) => s.dataGroups);

  const knownBrokerData = brokers.map((broker) => {
    const brokerClients = clients.filter((client) => client.brokerId === broker.id);

    return {
      broker: `${broker.host}:${broker.port}`,
      packets: dataGroups.filter((group) =>
        brokerClients.some((client) => isGroupFromClient(group, client)),
      ).length,
    };
  });
  const unknownPackets = dataGroups.filter(
    (group) => !clients.some((client) => isGroupFromClient(group, client)),
  ).length;
  const chartData =
    unknownPackets > 0
      ? [
          ...knownBrokerData,
          { broker: "Неизвестный источник", packets: unknownPackets },
        ]
      : knownBrokerData;

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
        title="Пакеты данных по брокерам"
        subheader="Распределение входящих пакетов с датчиков"
        action={
          <Chip
            size="small"
            label="SignalR Receive"
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
              data: chartData.map((data) => data.broker),
              tickLabelStyle: { fontSize: 10, fill: "#71877C" },
            },
          ]}
          series={[
            {
              data: chartData.map((data) => data.packets),
              label: "Пакеты данных",
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
