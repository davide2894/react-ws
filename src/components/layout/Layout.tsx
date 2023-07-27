import Footer from "@components/footer/Footer";
import TopBar from "@components/topBar/TopBar";
import styles from "./Layout.module.css";
import { Lato } from "next/font/google";
const lato = Lato({
  style: "normal",
  weight: ["100", "400", "700", "900"],
  subsets: ["latin"],
  preload: true,
});

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={lato.className}>
      <TopBar />

      <div className={styles.layoutBody}>{children}</div>

      <Footer />
    </div>
  );
}

export default Layout;
