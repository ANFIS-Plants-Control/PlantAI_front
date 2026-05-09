import styles from "./Header.module.css";
import plant from "../../plant.png";

export function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.site_title}>
        <img className={styles.icon} src={plant} />
        <div>PlantAI</div>
      </div>

      <div className={styles.navigation}>
        <div>Main</div>
        <div>About</div>
        <div>Dick</div>
      </div>
    </div>
  );
}
