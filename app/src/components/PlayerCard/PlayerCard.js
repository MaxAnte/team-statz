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
        ) : (
          ""
        )}
        {player.bestInReb ? (
          <div className={styles.playerBadge}>
            <img src={glassCleaner} alt="Glass cleaner" />
            <span>Glass cleaner</span>
          </div>
        ) : (
          ""
        )}
        {player.bestInAst ? (
          <div className={styles.playerBadge}>
            <img src={assist} alt="Point GOD" />
            <span>Point GOD</span>
          </div>
        ) : (
          ""
        )}
        {player.bestInBlk ? (
          <div className={styles.playerBadge}>
            <img src={block} alt="Block mashine" />
            <span>You shall NOT pass</span>
          </div>
        ) : (
          ""
        )}
        {player.bestInStl ? (
          <div className={styles.playerBadge}>
            <img src={thief} alt="Thief" />
            <span>Thief</span>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={styles.playerImg}>
        <img
          src={player.image_thumb === "" ? blankPhoto : player.image_thumb}
          alt="Player"
        />
      </div>
      <p className={styles.playerName}>
        {player.name}, {player.position}
      </p>
      <div className={styles.playerStats}>
        <div className={styles.playerStatsItem}>PPG: {player.pts}</div>
        <div className={styles.playerStatsItem}>RPG: {player.reb}</div>
        <div className={styles.playerStatsItem}>APG: {player.ast}</div>
        <div className={styles.playerStatsItem}>BPG: {player.blk}</div>
        <div className={styles.playerStatsItem}>SPG: {player.stl}</div>
      </div>
    </div>
  );
}

export default PlayerCard;
