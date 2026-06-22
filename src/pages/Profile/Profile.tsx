import { ProfileContent } from "../../features/profile/ProfileContent";
import styles from "./Profile.module.css";

export function Profile() {
  return (
    <main className={styles.container}>
      <ProfileContent />
    </main>
  );
}
