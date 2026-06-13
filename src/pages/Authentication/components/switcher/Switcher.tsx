import { Button, Stack } from "@mui/material";
import { useAuthenticationStore } from "../../store";
import style from "./Switcher.module.css";

export function Switcher() {
  const store = useAuthenticationStore();

  return (
    <Stack className={style.switcher} direction="row">
      <Button
        className={style.switcher_element}
        data-active={store.mode === "signin"}
        onClick={() => store.mode !== "signin" && store.updateMode()}
      >
        Вход
      </Button>
      <Button
        className={style.switcher_element}
        data-active={store.mode === "signup"}
        onClick={() => store.mode !== "signup" && store.updateMode()}
      >
        Регистрация
      </Button>
    </Stack>
  );
}
