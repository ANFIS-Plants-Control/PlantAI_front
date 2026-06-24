import { Box, Card, Divider, Stack } from "@mui/material";
import { useMqttClientStore } from "./store";
import { useEffect } from "react";

import { ClientCardHeader } from "./partials/ClientCard/header";
import { ClientCardContent } from "./partials/ClientCard/content";
import { ClientCardActions } from "./partials/ClientCard/actions";
import { Title } from "./partials/title";
import { DialogEdit } from "./partials/dialogEdit";
import { DialogCreate } from "./partials/dialogCreate";

export function MqttClient() {
  const clients = useMqttClientStore((s) => s.clients);
  const init = useMqttClientStore((s) => s.init);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Stack sx={{ flex: 1, p: 4 }} spacing={4}>
      <DialogEdit />
      <DialogCreate />
      <Title />
      <Stack direction="row" sx={{ gap: 2, flexWrap: "wrap" }}>
        {clients &&
          clients.map((c) => (
            <Card
              key={c.id}
              sx={{
                width: 470,
                maxWidth: "100%",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <ClientCardHeader client={c} />
              <ClientCardContent client={c} />
              <Box>
                <Divider />
                <ClientCardActions client={c} />
              </Box>
            </Card>
          ))}
      </Stack>
    </Stack>
  );
}
