import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import { Box, Chip, Container, Paper, Stack, Typography } from "@mui/material";
import { useUserStore } from "../../stores/UserStore";
import styles from "./ProfileContent.module.css";

const roleNames: Record<number, string> = {
  1: "Пользователь",
  2: "Оператор",
  3: "Администратор",
};

const workSchedule = [
  { day: "Понедельник", hours: "09:00 — 18:00", status: "Рабочий день" },
  { day: "Вторник", hours: "09:00 — 18:00", status: "Рабочий день" },
  { day: "Среда", hours: "09:00 — 18:00", status: "Рабочий день" },
  { day: "Четверг", hours: "09:00 — 18:00", status: "Рабочий день" },
  { day: "Пятница", hours: "09:00 — 17:00", status: "Сокращённый день" },
  { day: "Суббота", hours: "Выходной", status: "Выходной" },
  { day: "Воскресенье", hours: "Выходной", status: "Выходной" },
];

export function ProfileContent() {
  const user = useUserStore((state) => state.user);
  const login = user?.Login || "Не указан";
  const role = user ? roleNames[user.Role] || `Роль №${user.Role}` : "Не указана";

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Stack spacing={1} className={styles.heading}>
        <Chip
          icon={<PersonOutlineRoundedIcon />}
          label="Личный кабинет"
          className={styles.eyebrow}
        />
        <Typography component="h1" className={styles.title}>
          Профиль
        </Typography>
        <Typography className={styles.subtitle}>
          Данные учётной записи и ваш график работы в PlantAI.
        </Typography>
      </Stack>

      <Box className={styles.layout}>
        <Paper component="section" elevation={0} className={styles.accountCard}>
          <Box className={styles.cardHeader}>
            <Box className={styles.headerIcon}>
              <LockOutlinedIcon />
            </Box>
            <Box>
              <Typography component="h2" className={styles.cardTitle}>
                Учётная запись
              </Typography>
              <Typography className={styles.cardHint}>
                Основная информация профиля
              </Typography>
            </Box>
          </Box>

          <Stack className={styles.details}>
            <Box className={styles.detailRow}>
              <Box className={styles.detailIcon}>
                <PersonOutlineRoundedIcon />
              </Box>
              <Box>
                <Typography className={styles.label}>Логин</Typography>
                <Typography className={styles.value}>{login}</Typography>
              </Box>
            </Box>
            <Box className={styles.detailRow}>
              <Box className={styles.detailIcon}>
                <WorkOutlineRoundedIcon />
              </Box>
              <Box>
                <Typography className={styles.label}>Роль</Typography>
                <Typography className={styles.value}>{role}</Typography>
              </Box>
            </Box>
          </Stack>
        </Paper>

        <Paper component="section" elevation={0} className={styles.scheduleCard}>
          <Box className={styles.cardHeader}>
            <Box className={styles.headerIcon}>
              <CalendarMonthOutlinedIcon />
            </Box>
            <Box>
              <Typography component="h2" className={styles.cardTitle}>
                Расписание работ
              </Typography>
              <Typography className={styles.cardHint}>Текущая рабочая неделя</Typography>
            </Box>
          </Box>

          <Box className={styles.schedule}>
            {workSchedule.map((item) => {
              const isDayOff = item.status === "Выходной";

              return (
                <Box key={item.day} className={styles.scheduleRow}>
                  <Typography className={styles.day}>{item.day}</Typography>
                  <Typography className={isDayOff ? styles.dayOff : styles.hours}>
                    {item.hours}
                  </Typography>
                  <Chip
                    label={item.status}
                    size="small"
                    className={isDayOff ? styles.offChip : styles.workChip}
                  />
                </Box>
              );
            })}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
