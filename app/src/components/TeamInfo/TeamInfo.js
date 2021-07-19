import React from "react";

import logo from "../../assets/images/logo-bc.png";

import styles from "./teamInfo.module.css";

function TeamInfo({ players, games }) {
  const actualGames = games.filter((game) => !game.pending);
  const arrTotals = Array(4).fill(0);
  const properties = ["REB", "AST", "BLK", "STL"];
  let offensiveRating = 0;
  let defensiveRating = 0;
  let winsCount = 0;
  players.forEach((el) => {
    arrTotals[0] += el.reb;
    arrTotals[1] += el.ast;
    arrTotals[2] += el.blk;
    arrTotals[3] += el.stl;
  });
  actualGames.forEach((el) => {
    if (el.ourScore > el.enemyScore) winsCount++;
    offensiveRating += el.ourScore / actualGames.length;
    defensiveRating += el.enemyScore / actualGames.length;
  });

  return (
    <div className={styles.teamInfo}>
      <div className={styles.teamInfoLeft}>
        <img src={logo} alt="BC logo" />
      </div>
      <div className={styles.teamInfoRight}>
        <p>GP: {actualGames.length}</p>
        <p>
          W/L: {winsCount}/{actualGames.length - winsCount}
        </p>
        <p>ORtg: {offensiveRating}</p>
        <p>DRtg: {defensiveRating}</p>
        {arrTotals.map((el, i) => {
          return (
            <p key={i}>
              <span>{properties[i]}: </span>
              {(el / actualGames.length).toFixed(1)}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default TeamInfo;
