import NetworkCheckRoundedIcon from "@mui/icons-material/NetworkCheckRounded";
import {
  Box,
  Card,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useSensorDataStore } from "../store";

const sensorTypeNames: Record<number, string> = {
  1: "Температура",
  2: "Влажность",
  3: "CO2",
};

const sensorTypeUnits: Record<number, string> = {
  1: "°C",
  2: "%",
  3: "ppm",
};

function normalizeNetworkResponse(value: number) {
  return Math.min(1, Math.max(0.2, Math.round(value * 5) / 5));
}

function getQualityColor(quality: number) {
  if (quality >= 0.8) return "#2E9C69";
  if (quality >= 0.6) return "#E18A2C";
  return "#D9534F";
}

function NetworkQuality({ value }: { value?: number }) {
  if (value === undefined) {
    return (
      <Typography sx={{ color: "#9AA9A1", fontSize: "0.75rem" }}>
        Нет данных
      </Typography>
    );
  }

  const quality = normalizeNetworkResponse(value);
  const activeSteps = Math.round(quality * 5);
  const color = getQualityColor(quality);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={{ display: "flex", alignItems: "flex-end", gap: 0.35, height: 18 }}
      >
        {[1, 2, 3, 4, 5].map((step) => (
          <Box
            key={step}
            sx={{
              width: 5,
              height: 4 + step * 2.5,
              borderRadius: 1,
              bgcolor: step <= activeSteps ? color : "#E3EBE6",
            }}
          />
        ))}
      </Box>
      <Typography
        sx={{ minWidth: 24, color, fontSize: "0.75rem", fontWeight: 800 }}
      >
        {quality.toFixed(1)}
      </Typography>
    </Box>
  );
}

export function SensorDataTable() {
  const dataGroups = useSensorDataStore((state) => state.dataGroups);
  const sensorData = useSensorDataStore((state) => state.sensorData);
  const dataGroupDates = new Map(
    dataGroups.map((dataGroup) => [dataGroup.id, dataGroup.date]),
  );
  const rows = sensorData
    .map((data) => ({
      ...data,
      date: dataGroupDates.get(data.dataGroupId),
    }))
    .filter((row) => row.date !== undefined)
    .sort(
      (first, second) =>
        dayjs(second.date).valueOf() - dayjs(first.date).valueOf(),
    );

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        boxSizing: "border-box",
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
            <NetworkCheckRoundedIcon />
          </Box>
        }
        title="Данные с датчиков"
        subheader="Последние измерения и качество ответа сети"
        action={
          <Chip
            size="small"
            label={`${rows.length} записей`}
            sx={{
              mt: 0.75,
              mr: 1,
              color: "#1C7C54",
              bgcolor: "#E8F5EC",
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

      <TableContainer sx={{ maxHeight: "calc(100vh - 280px)" }}>
        <Table stickyHeader size="small" aria-label="Данные с датчиков">
          <TableHead>
            <TableRow>
              {["Дата", "Значение", "Тип датчика", "Ответ сети"].map(
                (heading) => (
                  <TableCell
                    key={heading}
                    sx={{
                      borderColor: "#EAF0EC",
                      color: "#71877C",
                      bgcolor: "#F7FAF8",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                    }}
                  >
                    {heading}
                  </TableCell>
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{ "&:last-child td": { borderBottom: 0 } }}
                >
                  <TableCell
                    sx={{
                      borderColor: "#EEF3F0",
                      color: "#526D5F",
                      fontSize: "0.78rem",
                    }}
                  >
                    {dayjs(row.date).format("DD.MM.YYYY HH:mm:ss")}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: "#EEF3F0",
                      color: "#214B37",
                      fontSize: "0.8rem",
                      fontWeight: 800,
                    }}
                  >
                    {row.value} {sensorTypeUnits[row.sensorTypeId] ?? ""}
                  </TableCell>
                  <TableCell sx={{ borderColor: "#EEF3F0" }}>
                    <Chip
                      size="small"
                      label={
                        sensorTypeNames[row.sensorTypeId] ??
                        `Тип ${row.sensorTypeId}`
                      }
                      sx={{
                        color: "#365846",
                        bgcolor: "#EEF6F0",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ borderColor: "#EEF3F0" }}>
                    <NetworkQuality value={row.networkResponse} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ py: 6, borderBottom: 0, color: "#8A9C93" }}
                >
                  Данные с датчиков пока не поступили
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
