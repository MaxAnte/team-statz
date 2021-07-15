import React from "react";
import GamePlayerStat from "../GamePlayerStat/GamePlayerStat";

import styles from "./gameCard.module.css";

function GameCard({ game }) {
  return (
    <div className={styles.gameCard}>
      <h4 className={styles.gameName}>vs. {game.enemy}</h4>
      <div className={styles.gameScore}>
        <span
          className={`our ${
            game.ourScore > game.enemyScore ? styles.win : styles.lose
          }`}
        >
          {game.ourScore}
        </span>
        :<span>{game.enemyScore}</span>
      </div>
      <div className={styles.gameDate}>{game.date}</div>
      {game.playersStats.map((player) => {
        return (
          <GamePlayerStat player={player} gameID={game._id} key={player._id} />
        );
      })}
    </div>
  );
}

export default GameCard;
