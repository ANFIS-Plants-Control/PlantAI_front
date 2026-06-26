import styles from "./Header.module.css";
import plant from "../../Shared/images/plant.png";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.site_title}>
        <img alt="plant_icon" className={styles.icon} src={plant} />
        <div>PlantAI</div>
      </div>

      <div className={styles.navigation}>
        <Link component={RouterLink} to="/">
          На главную
        </Link>
        <Link component={RouterLink} to="/control_panel">
          Панель управления
        </Link>
        <Link component={RouterLink} to="/profile">
          Профиль
        </Link>
      </div>
    </div>
  );
}
