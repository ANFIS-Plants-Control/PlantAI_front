import { Paper, Stack, styled } from "@mui/material";
import style from "./MqttDashboard.module.css";
import { Table } from "./partials/table";
import { useMqttClientsStore } from "./store";
import { useEffect } from "react";

export function MqttDashboard() {
  const init = useMqttClientsStore((s) => s.init);
  useEffect(() => {
    init();
  }, []);

  const StyledPaper = styled(Paper)(({ theme }) => ({
    width: '30vw',
    textAlign: 'center',
    padding: '10px'
  }));

  return (
    <div className={style.container}>
      <div className={style.title}>Панель управления MQTT клиентами</div>
      <Stack direction="row" sx={{width: '100%', justifyContent: 'space-between', marginBottom: '7vh', flexWrap: 'wrap'}}>
        <Paper sx={{padding: '10px'}}>
          <StyledPaper>Всего клиентов</StyledPaper>
        </Paper>
        <Paper sx={{padding: '10px'}}>
          <StyledPaper>Подключено</StyledPaper>
        </Paper>
        <Paper sx={{padding: '10px'}}>
          <StyledPaper>Подписано</StyledPaper>
        </Paper>
      </Stack>
      <div className={style.address_group_table}>
        <Table />
      </div>
    </div>
  );
}
