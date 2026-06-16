import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useMqttClientStore } from "../store";
import { BrokerToAddr } from "../utils";

export function DialogCreate() {
  const client = useMqttClientStore((s) => s.createClient);
  const brokers = useMqttClientStore(s => s.brokers)
  const isCreate = useMqttClientStore((s) => s.isCreate);
  const setCreateClient = useMqttClientStore((s) => s.setCreateClient);
  const closeCreate = useMqttClientStore((s) => s.closeCreate);
  const handleCreateClient = useMqttClientStore((s) => s.handleCreateClient);

  return (
    <Dialog open={isCreate} onClose={closeCreate} maxWidth="sm" fullWidth>
      <DialogTitle>Создание MQTT клиента</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Название топика"
            placeholder="sensors/temperature"
            fullWidth
            required
            value={client.clientId}
            onChange={(e) => setCreateClient('clientId', e.target.value)}
          />
          <FormControl>
            <InputLabel>Связанный брокер</InputLabel>
            <Select 
              label='Связанный брокер' 
              value={BrokerToAddr(brokers.find(b => b.id === +client.brokerId))}
              onChange={e => setCreateClient('brokerId', e.target.value)}
            >
              {brokers.map(b => (
              <MenuItem key={b.id} value={b.id}>
                {BrokerToAddr(b)}
              </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button color="inherit" onClick={closeCreate}>
          Отмена
        </Button>

        <Button
          variant="contained"
          disabled={!client.clientId?.trim()}
          onClick={() => {
            handleCreateClient();
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
