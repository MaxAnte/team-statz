import React from "react";
import { useTranslation } from "react-i18next";
import { Player } from "../../context/app.types";

import styles from "./playerCard.module.css";

import blankPhoto from "../../assets/images/players/blank-silhouette.png";
import basket from "../../assets/images/badges/basket.svg";
import glassCleaner from "../../assets/images/badges/glass_cleaner.png";
import assist from "../../assets/images/badges/assist.png";
import thief from "../../assets/images/badges/thief.svg";
import block from "../../assets/images/badges/block.svg";

type Props = {
  player: Player;
};

function PlayerCard({ player }: Props) {
  const { t } = useTranslation();
  return (
    <div className={styles.playerCard}>
      <div className={styles.playerBadges}>
        {player.bestInPts ? (
          <div className={styles.playerBadge}>
            <img src={basket} alt={t("Bucket mashine")} />
            <span>{t("Bucket mashine")}</span>
          </div>
        ) : null}
        {player.bestInReb ? (
          <div className={styles.playerBadge}>
            <img src={glassCleaner} alt={t("Glass cleaner")} />
            <span>{t("Glass cleaner")}</span>
          </div>
        ) : null}
        {player.bestInAst ? (
          <div className={styles.playerBadge}>
            <img src={assist} alt={t("Point GOD")} />
            <span>{t("Point GOD")}</span>
          </div>
        ) : null}
        {player.bestInBlk ? (
          <div className={styles.playerBadge}>
            <img src={block} alt={t("You shall NOT pass")} />
            <span>{t("You shall NOT pass")}</span>
          </div>
        ) : null}
        {player.bestInStl ? (
          <div className={styles.playerBadge}>
            <img src={thief} alt={t("Thief")} />
            <span>{t("Thief")}</span>
          </div>
        ) : null}
      </div>

      <div className={styles.playerImg}>
        <img
          src={player.image_thumb ? player.image_thumb : blankPhoto}
          alt="Player"
        />
      </div>
      <p className={styles.playerName}>
        {player.name}, {player.position}
      </p>
      <div className={styles.playerStats}>
        <div className={styles.playerStatsItem}>
          {t("PPG")}: {player.pts ? parseFloat(player.pts.toFixed(1)) : 0}
        </div>
        <div className={styles.playerStatsItem}>
          {t("RPG")}: {player.reb ? parseFloat(player.reb.toFixed(1)) : 0}
        </div>
        <div className={styles.playerStatsItem}>
          {t("APG")}: {player.ast ? parseFloat(player.ast.toFixed(1)) : 0}
        </div>
        <div className={styles.playerStatsItem}>
          {t("BPG")}: {player.blk ? parseFloat(player.blk.toFixed(1)) : 0}
        </div>
        <div className={styles.playerStatsItem}>
          {t("SPG")}: {player.stl ? parseFloat(player.stl.toFixed(1)) : 0}
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
