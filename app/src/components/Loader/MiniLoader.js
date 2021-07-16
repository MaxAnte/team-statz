import React from "react";

import styles from "./loader.module.css";

function MiniLoader() {
  return (
    <div className={styles.miniLoaderWrap}>
      <div className={styles.miniLoader}></div>
    </div>
  );
}

export default MiniLoader;
