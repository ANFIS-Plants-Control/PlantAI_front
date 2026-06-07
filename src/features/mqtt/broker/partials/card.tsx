import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import DnsIcon from "@mui/icons-material/Dns";
import { BrokerParameters } from "../models/BrokerParameters";
import { useBrokerStore } from "../store";
import { useGlobalStore } from "../../../../stores/GlobalStore";

export function BrokerCard({ broker }: { broker: BrokerParameters }) {
  const openEdit = useBrokerStore((s) => s.openEdit);
  const showNotAvailable = useGlobalStore((s) => s.showNotAvailable);
  return (
    <Card
      sx={{
        width: 320,
        borderRadius: 3,

        border: "1px solid #e5e7eb",

        transition: "all .2s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Stack direction="row" sx={{ spacing: 1, alignItems: "center", mb: 2 }}>
          <DnsIcon
            sx={{
              color: "#1C7C54",
            }}
          />

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            MQTT Broker
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Host
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontWeight: 500, mb: 2, fontSize: "1.25rem" }}
        >
          {broker.host}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Port
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontWeight: 500, fontSize: "1.25rem" }}
        >
          {broker.port}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          px: 2,
          pb: 2,
        }}
      >
        <Button
          onClick={() => {
            openEdit(broker.id);
            showNotAvailable();
          }}
          size="small"
          sx={{ fontSize: "0.9rem" }}
        >
          Редактировать
        </Button>

        <Button size="small" color="error" sx={{ fontSize: "0.9rem" }}>
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
}
