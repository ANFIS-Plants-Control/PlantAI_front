import { Box, Paper } from "@mui/material";
import { useMqttDashboardStore } from "../store";
import { StyledBox, StyledTableTitle } from "./styles";

export function Table() {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  };

  const dashboard = useMqttDashboardStore((s) => s.dashboard);
  const dataGroups = useMqttDashboardStore((s) => s.dataGroups);

  const columns = "10vw 10vw minmax(10vw, 1fr) 24vw 14vw";

  const tableRowTitles = [
    "ClientId",
    "Статус",
    "Топик",
    "Время последнего сообщения",
    "Принято сообщений",
  ];
  return (
    <Box
      sx={{
        mx: "4rem",
        backgroundColor: "#fff",
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        minHeight: "280px",
        maxHeight: "1080px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Box sx={{ p: "0.4rem", m: "0.4rem" }}>
        {dashboard &&
          dashboard.map((d, i) => (
            <Paper sx={{ mb: 3 }} key={i}>
              <StyledTableTitle variant="h1" sx={{ mb: "0.7rem" }}>
                {d.host}:{d.port}
              </StyledTableTitle>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: columns,
                  gap: 2,
                  alignItems: "center",
                  fontWeight: 600,
                  borderBottom: 1,
                  borderColor: "divider",
                  pb: 1,
                  marginBottom: 1,
                }}
              >
                {tableRowTitles.map((t, j) => (
                  <StyledBox key={j}>{t}</StyledBox>
                ))}
              </Box>

              {d.clients &&
                d.clients.map((c, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: columns,
                      gap: 2,
                      alignItems: "center",
                      borderBottom: "1px solid #f1f5f9",
                      transition: "background-color .2s ease",

                      "&:hover": {
                        backgroundColor: "#f8fafc",
                      },
                    }}
                  >
                    <StyledBox>{c.clientId}</StyledBox>

                    <Box
                      sx={{
                        display: "inline-flex",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 10,
                        fontSize: "1.15rem",
                        fontWeight: 600,
                        backgroundColor: c.isSubscribed ? "#dcfce7" : "#fee2e2",
                        color: c.isSubscribed ? "#166534" : "#991b1b",
                      }}
                    >
                      {c.isSubscribed ? "Subscribed" : "Offline"}
                    </Box>

                    <StyledBox>topic</StyledBox>

                    <StyledBox>{formatDate(c.lastMessageDateTime)}</StyledBox>
                    <StyledBox>
                      {dataGroups.filter((d) => d.mqttClientId === c.id).length}
                    </StyledBox>
                  </Box>
                ))}
            </Paper>
          ))}
      </Box>
    </Box>
  );
}
