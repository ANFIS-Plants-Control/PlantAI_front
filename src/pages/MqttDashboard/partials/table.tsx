import { Box, IconButton, Paper, styled } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useMqttClientsStore } from "../store";

export function Table() {
  const clients = useMqttClientsStore((s) => s.mqttClients);
  const date: Date = new Date();
  const fromatDate: string = date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "2-digit",
  });
  const data = [
    {
      ClientId: "test",
      Status: "subscribed",
      Topic: "test",
      LastMessageTime: fromatDate,
    },
  ];
  if (clients) {
    clients.map((c) => {
      data.concat({
        ClientId: c.clientId,
        Status: "subscribed",
        Topic: c.topic,
        LastMessageTime: fromatDate,
      });
    });
  }

  const columns = "10vw 10vw minmax(10vw, 1fr) 24vw 6vw";

  const StyledBox = styled(Box)(({ theme }) => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }));

  const rowStyles = {
    display: "grid",
    gridTemplateColumns: columns,
    gap: 2,
    alignItems: "center",
  };

  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <Box
        sx={{
          ...rowStyles,
          fontWeight: 600,
          borderBottom: 1,
          borderColor: "divider",
          pb: 1,
        }}
      >
        <StyledBox>ClientId</StyledBox>
        <StyledBox>Статус</StyledBox>
        <StyledBox>Топик</StyledBox>
        <StyledBox>Время последнего сообщение</StyledBox>
        <StyledBox>Изменить</StyledBox>
      </Box>

      {data.map((d, i) => (
        <Box
          key={i}
          sx={{
            ...rowStyles,
            py: 1,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <StyledBox>{d.ClientId}</StyledBox>

          <StyledBox>{d.Status}</StyledBox>

          <StyledBox>{d.Topic}</StyledBox>

          <StyledBox>{d.LastMessageTime}</StyledBox>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Box>
      ))}
    </Paper>
  );
}
