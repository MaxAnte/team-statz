import React from "react";

import styles from "./footer.module.css";

function Footer({ children }) {
  return (
    <footer className={styles.footer}>
      <p>{children}</p>
    </footer>
  );
}

export default Footer;
