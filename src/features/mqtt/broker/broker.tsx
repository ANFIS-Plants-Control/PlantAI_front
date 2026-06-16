import { Box, Stack } from "@mui/material";
import { BrokerCard } from "./partials/card";
import { useBrokerStore } from "./store";
import { useEffect } from "react";
import { Title } from "./partials/title";
import { DialogCreate } from "./partials/dialogCreate";
import { DialogEdit } from "./partials/dialogEdit";

export function Broker() {
  const brokers = useBrokerStore((s) => s.brokers);
  const init = useBrokerStore((s) => s.init);
  useEffect(() => {
    init();
  }, [init]);
  return (
    <Box
      sx={{
        flex: 1,
        p: 4,
      }}
    >
      <DialogCreate />
      <DialogEdit />
      <Stack spacing={4}>
        <Title />

        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 3 }}>
          {brokers.map((broker) => (
            <BrokerCard key={broker.id} broker={broker} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
