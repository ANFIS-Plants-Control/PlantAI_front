import styles from "./Header.module.css";
import plant from "../../plant.png";
import { Link } from "@mui/material";

export function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.site_title}>
        <img alt="plant_icon" className={styles.icon} src={plant} />
        <div>PlantAI</div>
      </div>

      <div className={styles.navigation}>
        <div>Main</div>
        <div>About</div>
        <Link href="/mqtt_clients">Mqtt clients</Link>
      </div>
    </div>
  );
}
