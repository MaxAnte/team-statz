import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useTranslation } from "react-i18next";

import CloseIcon from "../../assets/icons/CloseIcon.tsx";

import styles from "./birthDayPopup.module.css";

function BirthDayPopup({ players, closeHandler }) {
  const [isBounced, setIsBounced] = useState(false);
  const { t } = useTranslation();

  const width = window.innerWidth;
  const height = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  useEffect(() => setTimeout(() => setIsBounced(true), 2000), []);

  return (
    <>
      <Confetti width={width} height={height} />
      <div className={`${styles.bdPopup} ${isBounced && styles.bounceIn}`}>
        <h5 className="subtitle text-center">
          {t(
            `Wish ${
              players.length > 1 ? "those killa’‎s" : "that killa"
            } a Happy Birth Day!`
          )}
        </h5>
        <div className={styles.playersWrap}>
          {players.map((player) => (
            <div key={player._id} className={styles.player}>
              <img src={player.image_thumb} alt={player.name} />
              <span>{player.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.closeBtn} onClick={() => closeHandler()}>
          <CloseIcon width="20px" height="20px" color="black" />
        </div>
      </div>
      <div className={styles.modalBg}></div>
    </>
  );
}

export default BirthDayPopup;
