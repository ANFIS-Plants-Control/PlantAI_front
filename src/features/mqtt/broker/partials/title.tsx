import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useBrokerStore } from "../store";

export function Title() {
  const openCreate = useBrokerStore((s) => s.openCreate);
  const init = useBrokerStore((s) => s.init);
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        MQTT Brokers
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
          onClick={() => openCreate()}
        >
          Создать брокер
        </Button>
      </Box>
    </Stack>
  );
}
