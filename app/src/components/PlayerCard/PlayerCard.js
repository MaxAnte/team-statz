import React from "react";

import styles from "./playerCard.module.css";

import blankPhoto from "../../assets/images/players/blank-silhouette.png";
import basket from "../../assets/images/badges/basket.svg";
import glassCleaner from "../../assets/images/badges/glass_cleaner.png";
import assist from "../../assets/images/badges/assist.png";
import thief from "../../assets/images/badges/thief.svg";
import block from "../../assets/images/badges/block.svg";

function PlayerCard({ player }) {
  return (
    <div className={styles.playerCard}>
      <div className={styles.playerBadges}>
        {player.bestInPts ? (
          <div className={styles.playerBadge}>
            <img src={basket} alt="Bucket mashine" />
            <span>Bucket mashine</span>
          </div>
        ) : null}
        {player.bestInReb ? (
          <div className={styles.playerBadge}>
            <img src={glassCleaner} alt="Glass cleaner" />
            <span>Glass cleaner</span>
          </div>
        ) : null}
        {player.bestInAst ? (
          <div className={styles.playerBadge}>
            <img src={assist} alt="Point GOD" />
            <span>Point GOD</span>
          </div>
        ) : null}
        {player.bestInBlk ? (
          <div className={styles.playerBadge}>
            <img src={block} alt="Block mashine" />
            <span>You shall NOT pass</span>
          </div>
        ) : null}
        {player.bestInStl ? (
          <div className={styles.playerBadge}>
            <img src={thief} alt="Thief" />
            <span>Thief</span>
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
          PPG: {player.pts ? player.pts.toFixed(2) : 0}
        </div>
        <div className={styles.playerStatsItem}>
          RPG: {player.reb ? player.reb.toFixed(2) : 0}
        </div>
        <div className={styles.playerStatsItem}>
          APG: {player.ast ? player.ast.toFixed(2) : 0}
        </div>
        <div className={styles.playerStatsItem}>
          BPG: {player.blk ? player.blk.toFixed(2) : 0}
        </div>
        <div className={styles.playerStatsItem}>
          SPG: {player.stl ? player.stl.toFixed(2) : 0}
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
