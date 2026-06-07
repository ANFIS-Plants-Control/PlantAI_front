import { Stack } from "@mui/material";
import { Table } from "./partials/table";
import { Stats } from "./partials/stats";
import { JSX, useEffect } from "react";
import { useMqttDashboardStore } from "./store";

export function Dashboard(): JSX.Element {
  const init = useMqttDashboardStore((s) => s.init);
  useEffect(() => {
    init();
  }, [init]);

  return (
    <Stack
      direction="column"
      sx={{
        flexGrow: 1,
        alignItems: "center",
      }}
    >
      <Stats />
      <Table />
    </Stack>
  );
}
