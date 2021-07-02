import React from "react";

import CloseIcon from "../../assets/icons/CloseIcon";

import styles from "./addGamePopup.module.css";

function AddGamePopup({ closeHandler }) {
  return (
    <div className={styles.popupWrap}>
      <div className={styles.popupContainer}>
        <h3 className={styles.popupTitle}>Add Game Stats</h3>
        <form className={styles.addGameForm}>
          <h4 className={styles.popupSubtitle}>General game information</h4>
          <div className={styles.popupSection}>
            <div className={styles.genGameInfo}>
              <span className={styles.genGameInfoNames}>Basketball City</span>
              <input
                type="text"
                maxLength="3"
                name="ourScore"
                id="ourScore"
                className={styles.genGameInfoScore}
              />
              <span>:</span>
              <input
                type="text"
                maxLength="3"
                name="enemyScore"
                id="enemyScore"
                className={styles.genGameInfoScore}
              />
              <input
                name="enemyName"
                id="enemyName"
                className={styles.genGameInfoNames}
                placeholder="Enemy Team"
              />
            </div>
          </div>

          <h4 className={styles.popupSubtitle}>
            Players that have played that game
          </h4>
          <div className={styles.popupSection}>
            <div className={styles.playersSelect}></div>
          </div>
          <span>Popup</span>
        </form>

        <div className={styles.closeBtn} onClick={() => closeHandler()}>
          <CloseIcon width="20px" heigth="20px" color="black" />
        </div>
      </div>
    </div>
  );
}

export default AddGamePopup;
