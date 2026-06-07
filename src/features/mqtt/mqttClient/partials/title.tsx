import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useMqttClientStore } from "../store";
import { AutorenewIcon } from "../../../../Shared/icons";

export function Title() {
  const init = useMqttClientStore((s) => s.init);
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        MQTT Clients
      </Typography>
      <Box>
        <IconButton sx={{ mr: 1 }} onClick={init}>
          <AutorenewIcon sx={{ fontSize: "2.2rem" }} />
        </IconButton>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1C7C54",
            "&:hover": {
              backgroundColor: "#176646",
            },
            fontSize: "1.1rem",
          }}
        >
          Создать клиента
        </Button>
      </Box>
    </Stack>
  );
}
