import React from "react";

import CloseIcon from "../../assets/icons/CloseIcon";

import styles from "./addGamePopup.module.css";

function AddGamePopup({ closeHandler }) {
  return (
    <div className={styles.popupWrap}>
      <h3 className={styles.popupTitle}>Add Game Stats</h3>
      <h4 className={styles.popupSubtitle}>General game information</h4>
      <span>Popup</span>
      <div className={styles.closeBtn} onClick={() => closeHandler()}>
        <CloseIcon width="20px" heigth="20px" color="black" />
      </div>
    </div>
  );
}

export default AddGamePopup;
