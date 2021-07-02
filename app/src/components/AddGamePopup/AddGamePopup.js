import React, { useState } from "react";

import CloseIcon from "../../assets/icons/CloseIcon";

import styles from "./addGamePopup.module.css";

import blankPhoto from "../../assets/images/players/blank-silhouette.png";

function AddGamePopup({ closeHandler }) {
  const [playersCheck, setPlayersCheck] = useState(Array(11).fill(false));
  const [checkListAccept, setCheckListAccept] = useState(false);
  const handleCheck = (index) => {
    const newCheckSet = playersCheck;
    newCheckSet[index] = !newCheckSet[index];
    setPlayersCheck([...playersCheck]);
  };
  return (
    <div className={styles.popupWrap}>
      <div className={styles.popupContainer}>
        <h3 className={styles.popupTitle}>Add Game Stats</h3>
        <form className={styles.addGameForm}>
          <h4 className={styles.popupSubtitle}>Set general game information</h4>
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
            Check players that have played that game
          </h4>
          <div className={styles.popupSection}>
            <div className={styles.playersSelect}>
              {playersCheck.map((_, i) => (
                <div
                  key={`playerName_${i}`}
                  className={styles.playerCard}
                  onClick={() => handleCheck(i)}
                >
                  <img src={blankPhoto} alt="" />
                  <span>Player Name, Position</span>
                  <span className={styles.playerCheck}></span>
                  {!playersCheck[i] ? (
                    <div className={styles.disabler}></div>
                  ) : null}
                </div>
              ))}
            </div>

            {!checkListAccept ? (
              <button
                className={styles.playersSelectAccept}
                onClick={() => setCheckListAccept(true)}
              >
                Save
              </button>
            ) : null}
          </div>

          {!checkListAccept ? <span>Check players above</span> : null}
          {checkListAccept ? (
            <>
              <h4 className={styles.popupSubtitle}>Add stats to each player</h4>
              <div className={styles.popupSection}>
                <div className={styles.playersStats}>
                  {playersCheck
                    .filter((el) => el)
                    .map((_, i) => (
                      <div
                        key={`playerName_${i}`}
                        className={styles.playerCard}
                      >
                        <img src={blankPhoto} alt="" />
                        <span>Player Name, Position</span>
                        <span className={styles.playerCheck}></span>
                      </div>
                    ))}
                </div>
              </div>
            </>
          ) : null}
        </form>

        <div className={styles.closeBtn} onClick={() => closeHandler()}>
          <CloseIcon width="20px" heigth="20px" color="black" />
        </div>
      </div>
    </div>
  );
}

export default AddGamePopup;
