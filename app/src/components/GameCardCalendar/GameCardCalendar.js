import React from "react";

import styles from "./gameCardCalendar.module.css";

function GameCardCalendar({ game }) {
  return (
    <div className={styles.calendarGameCard}>
      <h4 className={styles.calendarGameName}>vs. {game.enemy}</h4>
      {game.ourScore ? (
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
        <div className={styles.calendarGameDate}>
          at<span>{game.time}</span>
        </div>
      )}
    </div>
  );
}

export default GameCardCalendar;
