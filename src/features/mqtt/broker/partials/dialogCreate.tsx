import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useBrokerStore } from "../store";

export function DialogCreate() {
  const broker = useBrokerStore((s) => s.createBroker);

  const isCreate = useBrokerStore((s) => s.isCreate);
  const setCreateBroker = useBrokerStore((s) => s.setCreateBroker);
  const closeCreate = useBrokerStore((s) => s.closeCreate);
  const handleCreateBroker = useBrokerStore((s) => s.handleCreateBroker);

  return (
    <Dialog open={isCreate} onClose={closeCreate} maxWidth="sm" fullWidth>
      <DialogTitle>Создание MQTT топика</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Хост брокера"
            placeholder="sensors/temperature"
            fullWidth
            required
            value={broker.host}
            onChange={(e) => setCreateBroker("host", e.target.value)}
          />
        </Stack>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Порт брокера"
            placeholder="sensors/temperature"
            fullWidth
            required
            value={broker.port}
            onChange={(e) => setCreateBroker("port", +e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button color="inherit" onClick={closeCreate}>
          Отмена
        </Button>

        <Button
          variant="contained"
          disabled={!broker.host?.trim() && !broker.port}
          onClick={() => {
            handleCreateBroker();
            closeCreate();
          }}
          sx={{
            backgroundColor: "#1C7C54",
            "&:hover": {
              backgroundColor: "#176646",
            },
          }}
        >
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
