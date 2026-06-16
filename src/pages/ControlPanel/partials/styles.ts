import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledPanelBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#1C7C54",
  color: "#fff",
  fontWeight: 600,
  padding: "16px 40px",
  borderRadius: 2,
  letterSpacing: "0.5px",
  boxShadow: "0 2px 8px rgba(28, 124, 84, 0.25)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  borderBottom: "2px solid #d1cfcf",
  "&:hover": {
    backgroundColor: "#239b6a",
    boxShadow: "0 4px 12px rgba(28, 124, 84, 0.4)",
    transform: "translateY(-2px)",
  },
}));
