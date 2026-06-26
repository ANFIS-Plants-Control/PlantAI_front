import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Box, Card, CardHeader } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataGroup, MqttClient } from "../../models";
import { useMqttDashboardStore } from "../../store";

function isGroupFromClient(group: DataGroup, client: MqttClient) {
  return (
    group.mqttClientId === client.id ||
    (!!group.sourceClientId && group.sourceClientId === client.clientId)
  );
}

export function MessagesPerClient() {
  const dataGroups = useMqttDashboardStore((s) => s.dataGroups);
  const clients = useMqttDashboardStore((s) => s.mqttClients);
  const knownClientsData = clients.map((client) => ({
    client: client.clientId,
    sensorValues: dataGroups
      .filter((group) => isGroupFromClient(group, client))
      .reduce((sum, group) => sum + (group.sensorData?.length ?? 0), 0),
  }));
  const unknownSensorValues = dataGroups
    .filter((group) => !clients.some((client) => isGroupFromClient(group, client)))
    .reduce((sum, group) => sum + (group.sensorData?.length ?? 0), 0);
  const sensorValuesPerClient =
    unknownSensorValues > 0
      ? [
          ...knownClientsData,
          { client: "Неизвестный клиент", sensorValues: unknownSensorValues },
        ]
      : knownClientsData;

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        minWidth: 0,
        border: "1px solid rgba(28,124,84,0.1)",
        borderRadius: 4,
        bgcolor: "rgba(255,255,255,0.82)",
        boxShadow: "0 12px 32px rgba(36,89,61,0.06)",
      }}
    >
      <CardHeader
        avatar={
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              width: 40,
              height: 40,
              borderRadius: 2.5,
              color: "#1C7C54",
              bgcolor: "#E8F5EC",
            }}
          >
            <GroupsOutlinedIcon />
          </Box>
        }
        title="Показания по клиентам"
        subheader="Распределение входящих данных с датчиков"
        titleTypographyProps={{
          sx: { color: "#214B37", fontSize: "0.95rem", fontWeight: 800 },
        }}
        subheaderTypographyProps={{
          sx: { color: "#8A9C93", fontSize: "0.72rem" },
        }}
        sx={{ pb: 0 }}
      />
      <Box sx={{ width: "100%", height: 220 }}>
        <BarChart
          series={[
            {
              data: sensorValuesPerClient.map((item) => item.sensorValues),
              label: "Показания",
              id: "sensorValuesByClient",
              color: "#2E9C69",
            },
          ]}
          xAxis={[
            {
              data: sensorValuesPerClient.map((item) => item.client),
              tickLabelStyle: { fontSize: 11, fill: "#71877C" },
            },
          ]}
          yAxis={[{ width: 50 }]}
          grid={{ vertical: false, horizontal: true }}
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
