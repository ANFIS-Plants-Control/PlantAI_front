import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import { Box, Card, CardHeader } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useMqttDashboardStore } from "../store";

export function MessagesPerTopic() {
  const dataGroups = useMqttDashboardStore((s) => s.dataGroups);
  const topics = useMqttDashboardStore((s) => s.topics);
  const messagesPerTopic = topics.map((t) => ({
    topic: t.topic,
    messages: dataGroups.filter((dg) => dg.topicId === t.id).length,
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
          <Box sx={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 2.5, color: "#9B6BD3", bgcolor: "#F3EDFA" }}>
            <TopicOutlinedIcon />
          </Box>
        }
        title="Сообщения по топикам"
        subheader="Активность каналов MQTT"
        titleTypographyProps={{ sx: { color: "#214B37", fontSize: "0.95rem", fontWeight: 800 } }}
        subheaderTypographyProps={{ sx: { color: "#8A9C93", fontSize: "0.72rem" } }}
        sx={{ pb: 0 }}
      />
      <Box sx={{ width: "100%", height: 220 }}>
        <BarChart
          series={[
            {
              data: messagesPerTopic.map((mpc) => mpc.messages),
              label: "Сообщения",
              id: "messagesId",
              color: "#9B6BD3",
            },
          ]}
          xAxis={[
            {
              data: messagesPerTopic.map((mpc) => mpc.topic),
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
