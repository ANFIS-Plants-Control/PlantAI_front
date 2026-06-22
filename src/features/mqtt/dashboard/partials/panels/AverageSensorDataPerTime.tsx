import SensorsOutlinedIcon from "@mui/icons-material/SensorsOutlined";
import { Box, Button, Card, CardHeader } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useMqttDashboardStore } from "../../store";
import dayjs, { Dayjs } from "dayjs";

interface AvgData {
  date: Dayjs;
  value: number;
}

export function AverageSensorDataPerTime() {
  const dataGroups = useMqttDashboardStore((s) => s.dataGroups);
  const sensorDatas = useMqttDashboardStore((s) => s.sensorDatas);

  const filteredSensorDatas = sensorDatas.filter((sd) => sd.sensorTypeId === 1);
  const avgDataPerTime: AvgData[] = dataGroups.map((dg) => ({
    date: dayjs(dg.date),
    value:
      filteredSensorDatas
        .filter((sd) => sd.dataGroupId === dg.id)
        .reduce((sum, current) => sum + current.value, 0) /
      filteredSensorDatas.length,
  }));

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        minWidth: 0,
        height: 625,
        border: "1px solid rgba(28,124,84,0.1)",
        borderRadius: 4,
        bgcolor: "rgba(255,255,255,0.82)",
        boxShadow: "0 12px 32px rgba(36,89,61,0.06)",
      }}
    >
      <CardHeader
        avatar={
          <Box sx={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 2.5, color: "#2F80ED", bgcolor: "#EAF3FE" }}>
            <SensorsOutlinedIcon />
          </Box>
        }
        title="Динамика показаний датчиков"
        subheader="Средние значения за выбранный период"
        action={
          <Button
            size="small"
            variant="outlined"
            sx={{
              mt: 0.5,
              mr: 1,
              borderRadius: 2.5,
              borderColor: "rgba(28,124,84,0.22)",
              color: "#1C7C54",
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "none",
            }}
          >
            Сменить данные
          </Button>
        }
        titleTypographyProps={{ sx: { color: "#214B37", fontSize: "1rem", fontWeight: 800 } }}
        subheaderTypographyProps={{ sx: { color: "#8A9C93", fontSize: "0.75rem" } }}
      />
      <Box sx={{ width: "100%", px: 1 }}>
        <LineChart
          height={520}
          dataset={avgDataPerTime}
          series={[
            {
              dataKey: "value",
              label: "Среднее значение",
              color: "#2E9C69",
              showMark: false,
            },
          ]}
          xAxis={[
            {
              scaleType: "time",
              valueFormatter: (date) => dayjs(date).format("DD-MM-YY:H.mm.ss"),
              dataKey: "date",
              domainLimit: "nice",
              height: 100,
              tickLabelStyle: {
                angle: -35,
                fontSize: 10,
                fill: "#71877C",
              },
            },
          ]}
          grid={{ horizontal: true, vertical: false }}
          sx={{
            "& .MuiChartsGrid-line": { stroke: "#E5EEE8", strokeDasharray: "4 4" },
            "& .MuiLineElement-root": { strokeWidth: 3 },
          }}
        />
      </Box>
    </Card>
  );
}
