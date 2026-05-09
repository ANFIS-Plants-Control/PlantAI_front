import { Footer } from "./widgets/Footer/Footer";
import { Header } from "./widgets/Header/Header";
import styles from "./App.module.css";
import { TextColors } from "./Shared/Colors/TextColors/TextColors";
import { ComponentColors } from "./Shared/Colors/ComponentColors/ComponentColors";

//TODO: Create whole footer
//TODO: Create whole header
//TODO: Create router
//TODO: Create auth page

function App({ children }: { children: React.JSX.Element }) {
  return (
    <div
      className={styles.container}
      style={{
        color: TextColors.main,
        backgroundColor: ComponentColors.background,
      }}
    >
      <Header />

      {children}

      <Footer />
    </div>
  );
}

export default App;
