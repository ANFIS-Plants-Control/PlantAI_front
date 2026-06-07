import { Button, Stack, TextField } from "@mui/material";
import { useAuthenticationStore } from "../../store";
import style from "./Field.module.css";

import green_house from "../../../../Shared/images/green-house.png";
import { createUser } from "../../api/api";
import { useUserStore } from "../../../../stores/UserStore";

export function Field() {
  const store = useAuthenticationStore();
  const userStore = useUserStore();
  return (
    <div className={style.container}>
      <Stack className={style.title} direction="column">
        <img className={style.icon} src={green_house} alt="green house" />
        <div className={style.title_text}>
          {store.mode === "signin" ? "Вход в аккаунт" : "Регистрация аккаунта"}
        </div>
      </Stack>
      <Stack direction="column" sx={{ gap: "3vh", padding: "10vh 0" }}>
        <TextField
          label="Login"
          sx={{ width: "18vw", margin: "0 7vw" }}
          onChange={(val) => store.updateUser("Login", val.target.value)}
        ></TextField>
        <TextField
          sx={{ width: "18vw", margin: "0 7vw" }}
          label="Password"
          onChange={(val) => store.updateUser("Password", val.target.value)}
        ></TextField>
        <Button
          sx={{ width: "18vw", margin: "0 7vw" }}
          variant="contained"
          color="success"
          disabled={store.buttonStatus}
          onClick={() => {
            store.mode === "signin"
              ? userStore.setToken(store.user)
              : createUser(store.user);
          }}
        >
          {store.mode === "signin" ? "Войти" : "Зарегестрировать"}
        </Button>
      </Stack>
    </div>
  );
}
