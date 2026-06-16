import { Button, CardActions, Stack } from "@mui/material";
import { useMqttClientStore } from "../../store";

interface IClientcardActions {
  id: number;
}

export function ClientCardActions(props: IClientcardActions) {
  const openEdit = useMqttClientStore((s) => s.openEdit);
  return (
    <CardActions sx={{ justifyContent: "flex-end" }}>
      <Stack direction="row">
        <Button
          size="small"
          sx={{ fontSize: "0.9rem" }}
          onClick={() => openEdit(props.id)}
        >
          Редактировать
        </Button>
        <Button size="small" color="error" sx={{ fontSize: "0.9rem" }}>
          Удалить
        </Button>
      </Stack>
    </CardActions>
  );
}
