import React from "react";
import { useTranslation } from "react-i18next";

import { DateType } from "../../app/app.types";

import MiniLoader from "../Loader/miniLoader";

import styles from "./gameCardCalendar.module.css";

type Props = {
  game: DateType;
};

function GameCardCalendar({ game }: Props) {
  const { t } = useTranslation();
  return (
    <div className={styles.calendarGameCard}>
      <h4 className={styles.calendarGameName}>
        {t("vs.")} {game.enemy}
      </h4>
      {new Date() > new Date(game.date) ? (
        game.ourScore && game.enemyScore ? (
          <p className={styles.calendarGameScore}>
            <span
              className={`our ${
                game.ourScore > game.enemyScore ? styles.win : styles.lose
              }`}
            >
              {game.ourScore}
            </span>
            :<span>{game.enemyScore}</span>
          </p>
        ) : (
          <>
            <span>{t("Waiting for game info")}</span>
            <MiniLoader />
          </>
        )
      ) : (
        <p className={styles.calendarGameDate}>
          {t("at")}
          <span>{game.time}</span>
        </p>
      )}
    </div>
  );
}

export default GameCardCalendar;
