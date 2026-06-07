import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useTopicStore } from "../store";

export function DialogCreate() {
  const topic = useTopicStore((s) => s.createTopic);

  const isCreate = useTopicStore((s) => s.isCreate);
  const setCreateTopic = useTopicStore((s) => s.setCreateTopic);
  const closeCreate = useTopicStore((s) => s.closeCreate);
  const handleCreateTopic = useTopicStore((s) => s.handleCreateTopic);

  return (
    <Dialog open={isCreate} onClose={closeCreate} maxWidth="sm" fullWidth>
      <DialogTitle>Создание MQTT топика</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Название топика"
            placeholder="sensors/temperature"
            fullWidth
            required
            value={topic}
            onChange={(e) => setCreateTopic(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button color="inherit" onClick={closeCreate}>
          Отмена
        </Button>

        <Button
          variant="contained"
          disabled={!topic?.trim()}
          onClick={() => {
            handleCreateTopic();
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
