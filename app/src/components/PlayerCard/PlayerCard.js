import React from "react";

import styles from "./playerCard.module.css";

import blankPhoto from "../../assets/images/players/blank-silhouette.png";
import basket from "../../assets/images/badges/basket.svg";
import glassCleaner from "../../assets/images/badges/glass_cleaner.png";
import assist from "../../assets/images/badges/assist.png";
import thief from "../../assets/images/badges/thief.svg";
import block from "../../assets/images/badges/block.svg";

//temp
import lebron from "../../assets/images/players/lebron.png";
import stephen from "../../assets/images/players/stephen.png";
import hakeem from "../../assets/images/players/hakeem.png";
import nikola from "../../assets/images/players/nikola.png";
import john from "../../assets/images/players/john.png";

function PlayerCard({ player }) {
  const chooseImg = (name) => {
    switch (name) {
      case "Lebron James":
        return lebron;
      case "Nikola Jokic":
        return nikola;
      case "Stephen Curry":
        return stephen;
      case "Hakeem Olajuwon":
        return hakeem;
      case "John Stockton":
        return john;
      default:
        return blankPhoto;
    }
  };
  // rework area above

  const imgUrl = chooseImg(player.name);
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
          src={player.image_thumb ? player.image_thumb : imgUrl}
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
