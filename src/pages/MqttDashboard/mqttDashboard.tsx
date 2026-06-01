import { Box, Paper, Stack } from "@mui/material";
import style from "./MqttDashboard.module.css";
import { Table } from "./partials/table";
import { useMqttClientsStore } from "./store";
import { useEffect } from "react";

export function MqttDashboard() {
  const init = useMqttClientsStore((s) => s.init);
  useEffect(() => {
    init();
  }, []);
  return (
    <div className={style.container}>
      <div className={style.title}>Панель управления MQTT клиентами</div>
      <Stack direction="row">
        <Paper>Всего клиентов</Paper>
        <Paper>Подключено</Paper>
        <Paper>Подписано</Paper>
      </Stack>
      <div className={style.address_group_table}>
        <Box sx={{ margin: "0 1vw", padding: "1vh 0" }}>localhost:1883</Box>
        <Table />
      </div>
    </div>
  );
}
