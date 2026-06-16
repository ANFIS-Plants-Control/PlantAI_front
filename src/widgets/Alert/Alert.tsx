import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Alert as MuiAlert,
  AlertColor,
  AlertTitle,
  Box,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";
import { ReactNode } from "react";

interface AlertProps {
  open: boolean;
  message: ReactNode;
  onClose: () => void;
  title?: string;
  severity?: AlertColor;
  autoHideDuration?: number | null;
  actionLabel?: string;
  onAction?: () => void;
}

export function Alert({
  open,
  message,
  onClose,
  title,
  severity = "info",
  autoHideDuration = 5000,
  actionLabel,
  onAction,
}: AlertProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ mt: 7 }}
    >
      <MuiAlert
        severity={severity}
        variant="outlined"
        action={
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {actionLabel && onAction && (
              <Button
                color="inherit"
                size="small"
                onClick={onAction}
                sx={{
                  borderRadius: 2,
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  textTransform: "none",
                }}
              >
                {actionLabel}
              </Button>
            )}
            <IconButton
              aria-label="Закрыть уведомление"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        }
        sx={{
          width: { xs: "calc(100vw - 32px)", sm: 420 },
          alignItems: "flex-start",
          borderColor: "rgba(28,124,84,0.14)",
          borderRadius: 3,
          bgcolor: "rgba(255,255,255,0.96)",
          boxShadow: "0 18px 44px rgba(36,89,61,0.16)",
          backdropFilter: "blur(16px)",
          "& .MuiAlert-icon": {
            mt: title ? 0.4 : 0,
          },
          "& .MuiAlert-message": {
            color: "#526D5F",
            fontSize: "0.8rem",
            lineHeight: 1.55,
          },
        }}
      >
        {title && (
          <AlertTitle sx={{ mb: 0.35, color: "#214B37", fontSize: "0.88rem", fontWeight: 800 }}>
            {title}
          </AlertTitle>
        )}
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
