import AddLinkRoundedIcon from "@mui/icons-material/AddLinkRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  Button,
  CardActions,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { MqttClient } from "../../models";
import { useMqttClientStore } from "../../store";

interface IClientcardActions {
  client: MqttClient;
}

export function ClientCardActions(props: IClientcardActions) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const openEdit = useMqttClientStore((s) => s.openEdit);
  const topics = useMqttClientStore((s) => s.topics);
  const subscribeOnTopic = useMqttClientStore((s) => s.subscribeOnTopic);

  const subscribedTopicIds = new Set(
    props.client.topics?.map((topic) => topic.id) ?? [],
  );
  const availableTopics = topics.filter(
    (topic) => !subscribedTopicIds.has(topic.id),
  );

  const openTopicMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeTopicMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <CardActions sx={{ px: 1.5, py: 1, overflowX: "auto" }}>
      <Stack
        sx={{
          width: "100%",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignItems: "center",
          gap: 0.5,
          whiteSpace: "nowrap",
        }}
      >
        <Button
          id={`client-${props.client.id}-topics-button`}
          size="small"
          variant="outlined"
          startIcon={<AddLinkRoundedIcon />}
          endIcon={<KeyboardArrowDownRoundedIcon />}
          aria-controls={
            menuAnchor ? `client-${props.client.id}-topics-menu` : undefined
          }
          aria-haspopup="true"
          aria-expanded={menuAnchor ? "true" : undefined}
          onClick={openTopicMenu}
          sx={{
            flex: "1.5 0 auto",
            borderColor: "rgba(28,124,84,0.28)",
            borderRadius: 2,
            color: "#1C7C54",
            fontSize: "0.82rem",
            fontWeight: 700,
            textTransform: "none",
            "&:hover": {
              borderColor: "#1C7C54",
              bgcolor: "#E8F5EC",
            },
          }}
        >
          Подписаться на топик
        </Button>
        <Menu
          id={`client-${props.client.id}-topics-menu`}
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={closeTopicMenu}
          MenuListProps={{
            "aria-labelledby": `client-${props.client.id}-topics-button`,
          }}
          PaperProps={{
            sx: {
              minWidth: 220,
              maxWidth: 320,
              mt: 0.75,
              border: "1px solid rgba(28,124,84,0.1)",
              borderRadius: 2.5,
              boxShadow: "0 14px 36px rgba(36,89,61,0.14)",
            },
          }}
        >
          {availableTopics.length > 0 ? (
            availableTopics.map((topic) => (
              <MenuItem
                key={topic.id}
                onClick={() => {
                  subscribeOnTopic(props.client.clientId, topic.id);
                  closeTopicMenu();
                }}
                sx={{
                  mx: 0.75,
                  borderRadius: 1.5,
                  fontSize: "0.82rem",
                  "&:hover": { bgcolor: "#E8F5EC" },
                }}
              >
                <ListItemText
                  primary={topic.topic}
                  slotProps={{
                    primary: {
                      noWrap: true,
                      sx: { color: "#365846", fontSize: "0.82rem" },
                    },
                  }}
                />
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled sx={{ fontSize: "0.8rem" }}>
              Нет доступных топиков
            </MenuItem>
          )}
        </Menu>
        <Button
          size="small"
          sx={{ flex: "1 0 auto", fontSize: "0.82rem", textTransform: "none" }}
          onClick={() => openEdit(props.client.id)}
        >
          Редактировать
        </Button>
        <Button
          size="small"
          color="error"
          sx={{ flex: "1 0 auto", fontSize: "0.82rem", textTransform: "none" }}
        >
          Удалить
        </Button>
      </Stack>
    </CardActions>
  );
}
