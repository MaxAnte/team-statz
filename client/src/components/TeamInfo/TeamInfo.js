import React from "react";
import { useTranslation } from "react-i18next";

import logo from "../../assets/images/logo-bc.png";

import styles from "./teamInfo.module.css";

function TeamInfo({ players, games }) {
  const { t } = useTranslation();
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
  actualGames.length &&
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
        <p>
          {t("GP")}: {actualGames.length}
        </p>
        <p>
          {t("W")}/{t("L")}: {winsCount}/{actualGames.length - winsCount}
        </p>
        <p>
          {t("ORtg")}: {parseFloat(offensiveRating.toFixed(2))}
        </p>
        <p>
          {t("DRtg")}: {parseFloat(defensiveRating.toFixed(2))}
        </p>
        {arrTotals.map((el, i) => {
          return (
            <p key={i}>
              <span>{properties[i]}: </span>
              {actualGames.length ? (el / actualGames.length).toFixed(1) : 0}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default TeamInfo;
