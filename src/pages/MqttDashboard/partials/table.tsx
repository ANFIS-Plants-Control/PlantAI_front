import { Box, IconButton, Paper, styled, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useMqttClientsStore } from "../store";
import { MqttClientEditWindow } from "./MqttClientEditWindow";

export function Table() {
  const dashboard = useMqttClientsStore((s) => s.dashboard);
  const handleOpenDialog = useMqttClientsStore((s) => s.handleOpenDialog);

  const columns = "10vw 10vw minmax(10vw, 1fr) 24vw 120px";

  const StyledTableTitle = styled(Typography)(({ theme }) => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    fontSize: '2.5rem',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.015em',
    color: theme.palette.text.primary,

    mb: 2.5,

    position: 'relative',
    
}));

  const StyledBox = styled(Box)(({ theme }) => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    padding: theme.spacing(1.5, 2),
    fontSize: '0.95rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
    lineHeight: 1.5,
  }));

  const rowStyles = {
    display: "grid",
    gridTemplateColumns: columns,
    gap: 2,
    alignItems: "center",
  };
  return (
    <Paper sx={{ p: 2, m: 2 }}>
      {dashboard && dashboard.map((d, i) => (
        <Box key={i}>
        <StyledTableTitle variant="h1" sx={{mb: 2}}>{d.host}:{d.port}</StyledTableTitle>
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

        {d.clients && d.clients.map((c, i) => (
          <Box
          key={i}
          sx={{
            ...rowStyles,
            py: 1,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <StyledBox>{c.clientId}</StyledBox>

          <StyledBox>subscribed</StyledBox>

          <StyledBox>{c.topic.topic}</StyledBox>

          <StyledBox>{Date.now().toString()}</StyledBox>
          <IconButton>
            <EditIcon onClick={() => handleOpenDialog(true)} />
          </IconButton>
          <MqttClientEditWindow/>
        </Box>
        ))}
      </Box>
      ))}
      </Paper>
  );
}
