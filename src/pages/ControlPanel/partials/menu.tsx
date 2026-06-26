import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { JSX, useState } from "react";
import { useMqttPanelStore } from "../store";
import { PanelComponent } from "../models/PanelComponent";
import {
  DashboardIcon,
  DnsIcon,
  ManageAccountsIcon,
  PersonIcon,
  SensorsIcon,
  TableChartIcon,
  TopicIcon,
} from "../../../Shared/icons";

interface MenuItem {
  title: string;
  icon: JSX.Element | null;
  component?: PanelComponent;
  children?: MenuItem[];
}

export function Menu() {
  const [open, setOpen] = useState(true);

  const toggleMqtt = () => {
    setOpen(open ? false : true);
  };

  const setPanelComponent = useMqttPanelStore((s) => s.setPanelComponent);
  return (
    <List
      sx={{
        width: { xs: 220, md: 280 },
        flex: "0 0 auto",
        minWidth: { xs: 220, md: 280 },
        maxWidth: { xs: 220, md: 280 },
        height: "100%",
        overflowY: "auto",
        boxSizing: "border-box",
        backgroundColor: "#1C7C54",
        color: "#FFF",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{
            backgroundColor: "#1C7C54",
            color: "#FFF",
            fontSize: "2rem",
            fontWeight: 600,
          }}
        >
          Панель управления
        </ListSubheader>
      }
    >
      {menu.map((m, i) => {
        if (m.children)
          return (
            <Box key={i}>
              <ListItemButton
                onClick={toggleMqtt}
                sx={{ justifyContent: "space-between" }}
              >
                <ListItemIcon>{m.icon}</ListItemIcon>
                <ListItemText primary={m.title} />
                {open ? (
                  <ExpandLess sx={{ fontSize: "2rem" }} />
                ) : (
                  <ExpandMore sx={{ fontSize: "2rem" }} />
                )}
              </ListItemButton>
              <Collapse in={open}>
                <List>
                  {m.children.map((c, j) => (
                    <ListItemButton
                      key={j}
                      onClick={() => setPanelComponent(c.component)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon>{c.icon}</ListItemIcon>
                      <ListItemText primary={c.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          );
        else
          return (
            <ListItemButton
              key={i}
              onClick={() => setPanelComponent(m.component)}
            >
              <ListItemIcon>{m.icon}</ListItemIcon>
              <ListItemText primary={m.title} />
            </ListItemButton>
          );
      })}
    </List>
  );
}

const menu: MenuItem[] = [
  {
    title: "Dashboard",
    icon: <DashboardIcon sx={{ fontSize: "2rem", color: "#FFF" }} />,
    component: "Dashboard",
  },
  {
    title: "Данные датчиков",
    icon: <TableChartIcon sx={{ fontSize: "2rem", color: "#FFF" }} />,
    component: "SensorData",
  },
  {
    title: "Управление",
    icon: <ManageAccountsIcon sx={{ fontSize: "2rem", color: "#FFF" }} />,
    component: "Control",
  },
  {
    title: "MQTT",
    icon: <SensorsIcon sx={{ fontSize: "2rem", color: "#FFF" }} />,
    children: [
      {
        title: "Clients",
        icon: <PersonIcon sx={{ fontSize: "2rem", color: "#FFF" }} />,
        component: "MqttClients",
      },
      {
        title: "Topics",
        icon: <TopicIcon sx={{ fontSize: "2rem", color: "#FFF" }} />,
        component: "Topics",
      },
      {
        title: "Brokers",
        icon: <DnsIcon sx={{ fontSize: "2rem", color: "#FFF" }} />,
        component: "Brokers",
      },
    ],
  },
];
