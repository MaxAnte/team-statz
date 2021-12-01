import React, { useEffect,useState } from "react";
import Confetti from "react-confetti";
import { useTranslation } from "react-i18next";

import { Player } from "../../context/app.types";

import CloseIcon from "../../assets/icons/closeIcon";

import styles from "./birthDayPopup.module.css";

type Props = {
  players: Player[];
  closeHandler: () => void;
};

function BirthDayPopup({ players, closeHandler }: Props) {
  const [isBounced, setIsBounced] = useState<boolean>(false);
  const { t } = useTranslation();

  const width: number = window.innerWidth;
  const height: number = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  useEffect(() => {
    setTimeout(() => setIsBounced(true), 2000);
  }, []);

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
      <div className={styles.modalBg} />
    </>
  );
}

export default BirthDayPopup;
