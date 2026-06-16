import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { useUserStore } from "../../../../stores/UserStore";
import { createUser } from "../../api/api";
import { useAuthenticationStore } from "../../store";
import style from "./Field.module.css";

export function Field() {
  const store = useAuthenticationStore();
  const userStore = useUserStore();
  const isSignin = store.mode === "signin";

  return (
    <div className={style.container}>
      <div className={style.title}>
        <span className={style.kicker}>
          {isSignin ? "С возвращением" : "Начнём знакомство"}
        </span>
        <h2>{isSignin ? "Войдите в аккаунт" : "Создайте аккаунт"}</h2>
        <p>
          {isSignin
            ? "Введите данные, чтобы продолжить работу с PlantAI."
            : "Заполните данные, и ваша умная система будет готова к настройке."}
        </p>
      </div>

      <Stack className={style.form} direction="column">
        <TextField
          fullWidth
          label="Логин"
          placeholder="Введите ваш логин"
          autoComplete="username"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineRoundedIcon />
                </InputAdornment>
              ),
            },
          }}
          onChange={(event) => store.updateUser("Login", event.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          label="Пароль"
          placeholder="Введите ваш пароль"
          autoComplete={isSignin ? "current-password" : "new-password"}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            },
          }}
          onChange={(event) => store.updateUser("Password", event.target.value)}
        />
        <Button
          className={style.submit}
          fullWidth
          variant="contained"
          disabled={store.buttonStatus}
          endIcon={<ArrowForwardRoundedIcon />}
          onClick={() => {
            isSignin ? userStore.setToken(store.user) : createUser(store.user);
          }}
        >
          {isSignin ? "Войти в PlantAI" : "Создать аккаунт"}
        </Button>
      </Stack>
    </div>
  );
}
