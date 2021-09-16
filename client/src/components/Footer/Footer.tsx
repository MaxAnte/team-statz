import React from "react";

import styles from "./footer.module.css";

type Props = {
  children: React.ReactNode;
};

function Footer({ children }: Props) {
  return (
    <footer className={styles.footer}>
      <p>{children}</p>
    </footer>
  );
}

export default Footer;
