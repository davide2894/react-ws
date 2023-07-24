import Footer from "@components/footer/Footer";
import TopBar from "@components/topBar/TopBar";
import styles from "./Layout.module.css";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen layout">
      <TopBar />

      <div className={styles.layoutBody}>{children}</div>

      <Footer />
    </div>
  );
}

export default Layout;
