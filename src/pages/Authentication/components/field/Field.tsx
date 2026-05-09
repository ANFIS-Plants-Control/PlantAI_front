import { Button, Stack, TextField } from "@mui/material";
import { useAuthenticationStore } from "../../store";
import style from "./Field.module.css";

import green_house from "../../../../green-house.png";
import { createUser, getToken } from "../../api/api";

export function Field() {
  const store = useAuthenticationStore();
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
              ? getToken(store.user)
              : createUser(store.user);
          }}
        >
          {store.mode === "signin" ? "Войти" : "Зарегестрировать"}
        </Button>
      </Stack>
    </div>
  );
}
