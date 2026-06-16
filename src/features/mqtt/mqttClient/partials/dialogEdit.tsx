import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useMqttClientStore } from "../store";

export function DialogEdit() {
  const client = useMqttClientStore((s) => s.editClient);
  const isEdit = useMqttClientStore((s) => s.isEdit);
  const closeEdit = useMqttClientStore((s) => s.closeEdit);
  const updateClient = useMqttClientStore((s) => s.updateClient);
  const handleEditClient = useMqttClientStore((s) => s.handleEditClient);

  return (
    <Dialog open={isEdit} onClose={closeEdit} maxWidth="sm" fullWidth>
      <DialogTitle>Изменение MQTT топика</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Идентификатор клиента"
            placeholder="main"
            fullWidth
            required
            value={client.clientId}
            onChange={(e) => updateClient('clientId', e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button color="inherit" onClick={closeEdit}>
          Отмена
        </Button>

        <Button
          variant="contained"
          disabled={!client.clientId?.trim() && client.brokerId === -1}
          onClick={() => {
            handleEditClient();
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
