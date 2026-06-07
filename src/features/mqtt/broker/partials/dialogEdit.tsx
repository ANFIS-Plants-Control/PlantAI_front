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

export function DialogEdit() {
  const broker = useBrokerStore((s) => s.editBroker);
  const isEdit = useBrokerStore((s) => s.isEdit);
  const closeEdit = useBrokerStore((s) => s.closeEdit);
  const updateBroker = useBrokerStore((s) => s.updateBroker);
  const handleEditBroker = useBrokerStore((s) => s.handleEditBroker);

  return (
    <Dialog open={isEdit} onClose={closeEdit} maxWidth="sm" fullWidth>
      <DialogTitle>Изменение MQTT топика</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Хост брокера"
            placeholder="localhost"
            fullWidth
            required
            value={`${broker.host}`}
            onChange={(e) => updateBroker("host", e.target.value)}
          />
        </Stack>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Порт брокера"
            placeholder="1883"
            fullWidth
            required
            value={`${broker.port}`}
            onChange={(e) => updateBroker("port", +e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button color="inherit" onClick={closeEdit}>
          Отмена
        </Button>

        <Button
          variant="contained"
          disabled={!broker.host?.trim()}
          onClick={() => {
            handleEditBroker();
            closeEdit();
          }}
          sx={{
            backgroundColor: "#1C7C54",
            "&:hover": {
              backgroundColor: "#176646",
            },
          }}
        >
          Изменить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
