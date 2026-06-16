import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Box, Card, CardHeader } from "@mui/material";
import { useMqttDashboardStore } from "../store";
import { BarChart } from "@mui/x-charts/BarChart";

export function MessagesPerClient() {
  const dataGroups = useMqttDashboardStore((s) => s.dataGroups);
  const clients = useMqttDashboardStore((s) => s.mqttClients);
  const messagesPerClient = clients.map((c) => ({
    client: c.clientId,
    mesasges: dataGroups.filter((dg) => dg.mqttClientId === c.id).length,
  }));

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        minWidth: 0,
        height: 300,
        border: "1px solid rgba(28,124,84,0.1)",
        borderRadius: 4,
        bgcolor: "rgba(255,255,255,0.82)",
        boxShadow: "0 12px 32px rgba(36,89,61,0.06)",
      }}
    >
      <CardHeader
        avatar={
          <Box sx={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 2.5, color: "#1C7C54", bgcolor: "#E8F5EC" }}>
            <GroupsOutlinedIcon />
          </Box>
        }
        title="Сообщения по клиентам"
        subheader="Распределение входящих сообщений"
        titleTypographyProps={{ sx: { color: "#214B37", fontSize: "0.95rem", fontWeight: 800 } }}
        subheaderTypographyProps={{ sx: { color: "#8A9C93", fontSize: "0.72rem" } }}
        sx={{ pb: 0 }}
      />
      <Box sx={{ width: "100%", height: 220 }}>
        <BarChart
          series={[
            {
              data: messagesPerClient.map((mpc) => mpc.mesasges),
              label: "Сообщения",
              id: "messagesId",
              color: "#2E9C69",
            },
          ]}
          xAxis={[
            {
              data: messagesPerClient.map((mpc) => mpc.client),
              height: 30,
              tickLabelStyle: { fontSize: 11, fill: "#71877C" },
            },
          ]}
          yAxis={[{ width: 50 }]}
          grid={{ vertical: false, horizontal: true }}
          sx={{
            "& .MuiChartsGrid-line": { stroke: "#E5EEE8", strokeDasharray: "4 4" },
            "& .MuiBarElement-root": { rx: 5, ry: 5 },
          }}
        />
      </Box>
    </Card>
  );
}
