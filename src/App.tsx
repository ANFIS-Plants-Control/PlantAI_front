import { Footer } from "./widgets/Footer/Footer";
import { Header } from "./widgets/Header/Header";
import styles from "./App.module.css";
import { TextColors } from "./Shared/Colors/TextColors/TextColors";
import { ComponentColors } from "./Shared/Colors/ComponentColors/ComponentColors";
import { Box } from "@mui/material";
import { useGlobalStore } from "./stores/GlobalStore";
import { NotReleased } from "./widgets/NotReleased/NotReleased";

function App({ children }: { children: React.JSX.Element }) {
  const isShowNotAvailable = useGlobalStore((s) => s.isShowNotAvailable);
  return (
    <div
      className={styles.container}
      style={{
        color: TextColors.main,
        backgroundColor: ComponentColors.background,
      }}
    >
      <Header />
      {isShowNotAvailable && <NotReleased />}
      <Box>{children}</Box>
      <Footer />
    </div>
  );
}

export default App;
