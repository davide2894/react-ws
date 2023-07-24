import Image from "next/image";
import musixmatchLogo from "public/mxm-logo.svg";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Made with determination by Davide Iaiunese</p>
      <div className={styles.footerRow}>
        <p className={styles.poweredBy}>Powered by </p>
        <Image
          src={musixmatchLogo}
          className={styles.logo}
          alt="Musixmatch logo"
        />
      </div>
    </footer>
  );
}

export default Footer;
