import { Footer } from "./widgets/Footer/Footer";
import { Header } from "./widgets/Header/Header";
import styles from "./App.module.css";
import { TextColors } from "./Shared/Colors/TextColors/TextColors";
import { ComponentColors } from "./Shared/Colors/ComponentColors/ComponentColors";
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
      <div style={{display:'grid'}}>
      <Header /></div>
      <div style={{display: 'grid', overflow: 'hidden', overflowY: 'auto'}}>

      {children}
      </div>
      <div style={{display: 'grid'}}>
      <Footer />
      </div>

      {isShowNotAvailable && <NotReleased />}
    </div>
  );
}

export default App;
