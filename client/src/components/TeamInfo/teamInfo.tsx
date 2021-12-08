import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { parseToFixedWithoutZero } from "../../helpers/number.helpers";

import { Game, Player } from "../../app/app.types";

import { AppContext } from "../../app/app.provider";

import BlankLogo from "../../assets/images/logo-blank.png";

import styles from "./teamInfo.module.css";

type Props = {
  players: Player[];
  games: Game[];
};

function TeamInfo({ players, games }: Props) {
  const {
    settings: { teamLogo },
  } = useContext(AppContext);
  const { t } = useTranslation();
  const actualGames: Game[] = games.filter((game) => !game.pending);
  const arrTotals: number[] = Array(4).fill(0);
  const properties: string[] = ["REB", "AST", "BLK", "STL"];
  let offensiveRating: number = 0;
  let defensiveRating: number = 0;
  let winsCount: number = 0;
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
        <img src={teamLogo || BlankLogo} alt="Team logo" />
      </div>
      <div className={styles.teamInfoRight}>
        <p>
          {t("GP")}: {actualGames.length}
        </p>
        <p>
          {t("W")}/{t("L")}: {winsCount}/{actualGames.length - winsCount}
        </p>
        <p>
          {t("ORtg")}: {parseToFixedWithoutZero(offensiveRating)}
        </p>
        <p>
          {t("DRtg")}: {parseToFixedWithoutZero(defensiveRating)}
        </p>
        {arrTotals.map((el, i) => (
          <p key={`${properties[i]}-${el}`}>
            <span>{properties[i]}: </span>
            {actualGames.length
              ? parseToFixedWithoutZero(el / actualGames.length)
              : 0}
          </p>
        ))}
      </div>
    </div>
  );
}

export default TeamInfo;
