import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import SensorsOutlinedIcon from "@mui/icons-material/SensorsOutlined";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import greenHouse from "../../Shared/images/green-house.png";

const features = [
  {
    icon: <SensorsOutlinedIcon />,
    title: "Контроль микроклимата",
    description:
      "Следите за температурой, влажностью и состоянием растений в реальном времени.",
  },
  {
    icon: <HubOutlinedIcon />,
    title: "Единая MQTT-система",
    description:
      "Подключайте брокеры, устройства и топики в одном удобном пространстве.",
  },
  {
    icon: <InsightsOutlinedIcon />,
    title: "Понятная аналитика",
    description:
      "Находите закономерности и принимайте решения на основе наглядных данных.",
  },
];

const stats = [
  { value: "24/7", label: "мониторинг" },
  { value: "1", label: "единая панель" },
  { value: "100%", label: "контроль данных" },
];

export function Main() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100%",
        overflow: "hidden",
        bgcolor: "#F5FAF6",
        backgroundImage:
          "radial-gradient(circle at 12% 18%, rgba(87, 185, 126, 0.18), transparent 28rem), radial-gradient(circle at 92% 12%, rgba(46, 156, 105, 0.12), transparent 24rem)",
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(0, 1.05fr) minmax(22rem, 0.95fr)",
            },
            alignItems: "center",
            gap: { xs: 6, md: 8 },
            minHeight: { md: "52vh" },
          }}
        >
          <Stack sx={{ alignItems: "flex-start", spacing: 3 }}>
            <Chip
              icon={<AutoAwesomeOutlinedIcon />}
              label="Умная экосистема для растений"
              sx={{
                px: 0.5,
                color: "primary.dark",
                bgcolor: "rgba(255,255,255,0.72)",
                border: "1px solid rgba(28,124,84,0.14)",
                fontWeight: 700,
              }}
            />

            <Typography
              component="h1"
              sx={{
                maxWidth: "48rem",
                color: "#153D2B",
                fontSize: { xs: "2.7rem", sm: "4rem", lg: "5.3rem" },
                fontWeight: 800,
                lineHeight: 0.98,
                letterSpacing: "-0.065em",
              }}
            >
              Управляйте ростом с помощью данных
            </Typography>

            <Typography
              sx={{
                maxWidth: "40rem",
                color: "#5F786B",
                fontSize: { xs: "1rem", md: "1.12rem" },
                lineHeight: 1.7,
              }}
            >
              PlantAI объединяет датчики, MQTT-устройства и аналитику, чтобы
              забота о растениях стала точной, простой и предсказуемой.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                component={RouterLink}
                to="/control_panel"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  minHeight: 52,
                  px: 3,
                  borderRadius: 3,
                  bgcolor: "primary.dark",
                  boxShadow: "0 14px 28px rgba(28,124,84,0.22)",
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#176646" },
                }}
              >
                Открыть панель
              </Button>
              <Button
                component={RouterLink}
                to="/authentication"
                variant="outlined"
                size="large"
                sx={{
                  minHeight: 52,
                  px: 3,
                  borderRadius: 3,
                  borderColor: "rgba(28,124,84,0.28)",
                  color: "primary.dark",
                  bgcolor: "rgba(255,255,255,0.55)",
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                Войти в аккаунт
              </Button>
            </Stack>

            <Stack direction="row" spacing={{ xs: 2.5, sm: 5 }} sx={{ pt: 2 }}>
              {stats.map((stat) => (
                <Box key={stat.label}>
                  <Typography
                    sx={{
                      color: "#1C7C54",
                      fontSize: { xs: "1.4rem", sm: "1.7rem" },
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{ mt: 0.5, color: "#789084", fontSize: "0.75rem" }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>

          <Box
            sx={{
              position: "relative",
              display: "grid",
              placeItems: "center",
              minHeight: { xs: 320, md: 470 },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "80%",
                aspectRatio: "1",
                borderRadius: "50%",
                bgcolor: "rgba(46,156,105,0.12)",
                boxShadow: "0 0 0 45px rgba(46,156,105,0.045)",
              }}
            />
            <Box
              component="img"
              src={greenHouse}
              alt="Умная теплица PlantAI"
              sx={{
                position: "relative",
                zIndex: 1,
                width: { xs: "65%", md: "74%" },
                maxWidth: 430,
                objectFit: "contain",
                filter: "drop-shadow(0 28px 28px rgba(26, 91, 60, 0.18))",
              }}
            />
            <Card
              sx={{
                position: "absolute",
                zIndex: 2,
                right: { xs: 0, md: "2%" },
                bottom: { xs: 10, md: "12%" },
                width: { xs: 180, sm: 220 },
                border: "1px solid rgba(28,124,84,0.1)",
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.86)",
                boxShadow: "0 18px 44px rgba(36,89,61,0.13)",
                backdropFilter: "blur(16px)",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: "16px !important",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 42,
                    height: 42,
                    flex: "0 0 auto",
                    borderRadius: 2.5,
                    color: "primary.dark",
                    bgcolor: "primary.light",
                  }}
                >
                  <BoltOutlinedIcon />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: "#214B37",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                    }}
                  >
                    Всё работает
                  </Typography>
                  <Typography sx={{ color: "#789084", fontSize: "0.72rem" }}>
                    Система в норме
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2,
            mt: { xs: 6, md: 8 },
          }}
        >
          {features.map((feature) => (
            <Card
              key={feature.title}
              variant="outlined"
              sx={{
                borderColor: "rgba(28,124,84,0.1)",
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.74)",
                boxShadow: "none",
                transition: "transform 180ms ease, box-shadow 180ms ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 18px 40px rgba(36,89,61,0.1)",
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 48,
                    height: 48,
                    mb: 2,
                    borderRadius: 3,
                    color: "primary.dark",
                    bgcolor: "primary.light",
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  sx={{
                    mb: 1,
                    color: "#214B37",
                    fontSize: "1.05rem",
                    fontWeight: 800,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  sx={{
                    color: "#71877C",
                    fontSize: "0.86rem",
                    lineHeight: 1.65,
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
