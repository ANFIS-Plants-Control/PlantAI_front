import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTableTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  padding: theme.spacing(2, 3),
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  padding: theme.spacing(1.5, 2),
  fontWeight: 400,
  color: theme.palette.text.primary,
  lineHeight: 1.5,
  fontSize: "1.35rem",
}));
//ignore
