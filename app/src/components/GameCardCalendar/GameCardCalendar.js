import React from "react";
import { useTranslation } from "react-i18next";

import MiniLoader from "../Loader/MiniLoader";

import styles from "./gameCardCalendar.module.css";

function GameCardCalendar({ game }) {
  const { t } = useTranslation();
  return (
    <div className={styles.calendarGameCard}>
      <h4 className={styles.calendarGameName}>
        {t("vs.")} {game.enemy}
      </h4>
      {new Date() > new Date(game.date) ? (
        game.ourScore ? (
          <div className={styles.calendarGameScore}>
            <span
              className={`our ${
                game.ourScore > game.enemyScore ? styles.win : styles.lose
              }`}
            >
              {game.ourScore}
            </span>
            :<span>{game.enemyScore}</span>
          </div>
        ) : (
          <>
            <span>{t("Waiting for game info")}</span>
            <MiniLoader />
          </>
        )
      ) : (
        <div className={styles.calendarGameDate}>
          {t("at")}
          <span>{game.time}</span>
        </div>
      )}
    </div>
  );
}

export default GameCardCalendar;
