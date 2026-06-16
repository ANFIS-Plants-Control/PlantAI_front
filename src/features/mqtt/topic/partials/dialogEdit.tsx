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

export function DialogEdit() {
  const topic = useTopicStore((s) => s.editTopic);
  const isEdit = useTopicStore((s) => s.isEdit);
  const closeEdit = useTopicStore((s) => s.closeEdit);
  const updateTopic = useTopicStore((s) => s.updateTopic);
  const handleEditTopic = useTopicStore((s) => s.handleEditTopic);

  return (
    <Dialog open={isEdit} onClose={closeEdit} maxWidth="sm" fullWidth>
      <DialogTitle>Изменение MQTT топика</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Название топика"
            placeholder="sensors/temperature"
            fullWidth
            required
            value={topic.topic}
            onChange={(e) => updateTopic(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button color="inherit" onClick={closeEdit}>
          Отмена
        </Button>

        <Button
          variant="contained"
          disabled={!topic.topic?.trim()}
          onClick={() => {
            handleEditTopic();
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
