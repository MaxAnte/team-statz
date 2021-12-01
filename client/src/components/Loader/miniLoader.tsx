import React from "react";

import styles from "./loader.module.css";

export default function MiniLoader() {
  return (
    <div className={styles.miniLoaderWrap}>
      <div className={styles.miniLoader} />
    </div>
  );
}
