import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useGlobalStore } from "../../stores/GlobalStore";

export function NotReleased() {
  const isShowNotAvailable = useGlobalStore((s) => s.isShowNotAvailable);
  const hideNotAvailable = useGlobalStore((s) => s.hideNotAvailable);
  return (
    <Dialog
      open={isShowNotAvailable}
      onClose={hideNotAvailable}
      maxWidth="sm"
      fullWidth
      sx={{ zIndex: 9999 }}
    >
      <DialogTitle>Раздел в разработке</DialogTitle>

      <DialogContent>Данный функционал пока недоступен.</DialogContent>

      <DialogActions>
        <Button onClick={hideNotAvailable}>Понятно</Button>
      </DialogActions>
    </Dialog>
  );
}
