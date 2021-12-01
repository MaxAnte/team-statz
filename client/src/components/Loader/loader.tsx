import React from "react";

import BasketBallIcon from "../../assets/icons/basketBallIcon";

import styles from "./loader.module.css";

export default function Loader() {
  return (
    <div className={styles.globalLoader}>
      <BasketBallIcon width="120px" height="120px" />
    </div>
  );
}
