import { createTheme } from "@mui/material";

export const DefaultTheme = createTheme({
  palette: {
    primary: {
      main: "#2E9C69",
      dark: "#1C7C54",
      light: "#DFF3E3",
    },
    background: {
      default: "#2E9C69",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          textDecoration: "none",
          fontWeight: 500,
          transition: "all 0.2s ease",
          "&:hover": {
            textDecoration: "underline",
            color: theme.palette.primary.dark,
          },

          "&:active": {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
  },
});
