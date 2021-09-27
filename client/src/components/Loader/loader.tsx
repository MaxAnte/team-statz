import React from "react";
import BasketBallIcon from "../../assets/icons/basketBall";

import styles from "./loader.module.css";

export default function Loader() {
  return (
    <div className={styles.globalLoader}>
      <BasketBallIcon width="120px" height="120px" />
    </div>
  );
}
