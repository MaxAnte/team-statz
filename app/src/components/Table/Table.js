import React from "react";

import styles from "./table.module.css";

function Table({ teams }) {
  const teamsWinRate = teams;
  teamsWinRate.forEach((el) => {
    el.winRate = (el.wins * 100) / (el.wins + el.loses);
    el.points = el.wins * 2 + el.loses * 1;
  });
  teamsWinRate.sort((a, b) => b.winRate - a.winRate);

  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableHead}>
        <span className={styles.tableRowPos}>№</span>
        <p className={styles.tableRowName}>Team</p>
        <span className={styles.tableRowWins}>W</span>
        <span className={styles.tableRowLoses}>L</span>
        <span className={styles.tableRowPoints}>Pts</span>
      </div>
      {teamsWinRate.map((el, i) => {
        return (
          <div className={styles.tableRow} key={`tableRow${i}`}>
            <span className={styles.tableRowPos}>{++i}</span>
            <p className={styles.tableRowName}>{el.name}</p>
            <span className={styles.tableRowWins}>{el.wins}</span>
            <span className={styles.tableRowLoses}>{el.loses}</span>
            <span className={styles.tableRowPoints}>{el.points}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Table;
