import { Button, Stack } from "@mui/material";
import style from "./Switcher.module.css";
import { useAuthenticationStore } from "../../store";

export function Switcher() {
  const store = useAuthenticationStore();
  return (
    <Stack direction="row" sx={{ marginBottom: "10px" }}>
      <Button
        className={style.switcher_element}
        sx={{
          fontWeight: store.mode === "signin" ? 600 : 500,
          color: store.mode === "signin" ? "#2B2B2B" : "#6B6B6B",
          backgroundColor: store.mode === "signin" ? "#2E9C6980" : "#2E9C6930",
        }}
        onClick={() => store.updateMode()}
      >
        Авторизация
      </Button>
      <Button
        className={style.switcher_element}
        sx={{
          fontWeight: store.mode === "signup" ? 600 : 500,
          color: store.mode === "signup" ? "#2B2B2B" : "#6B6B6B",
          backgroundColor: store.mode === "signup" ? "#2E9C6980" : "#2E9C6930",
        }}
        onClick={() => store.updateMode()}
      >
        Регистрация
      </Button>
    </Stack>
  );
}
