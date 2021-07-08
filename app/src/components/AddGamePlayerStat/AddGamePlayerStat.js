import React from "react";
import GamePlayerCanvas from "../GamePlayerCanvas/GamePlayerCanvas";

import styles from "./addGamePlayerStat.module.css";
import blankPhoto from "../../assets/images/players/blank-silhouette.png";

function AddGamePlayerStat() {
  return (
    <div className={styles.gamePlayerStat}>
      <div className={styles.gpsLeft}>
        <img src={blankPhoto} alt="" />
        <h5>Player Name, Position</h5>
      </div>
      <div className={styles.gpsRight}>
        <div className={styles.gpsStats}>
          <div className={styles.gpsStatsRow}>
            <div>
              <label htmlFor="playerPts">Points: </label>
              <input
                type="number"
                min="0"
                id="playerPts"
                className={styles.gpsStatsRowTitle}
                placeholder="0"
              />
            </div>
            <div className={styles.gpsStatsRowStats}>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="2pAtempted">2p Atempted: </label>
                  <input
                    type="number"
                    min="0"
                    id="2pAtempted"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="2pMade">2p Made: </label>
                  <input type="number" min="0" id="2pMade" placeholder="0" />
                </div>
              </div>
              {/* <div className={styles.gpsStatsRowItem}>
                <div>
                  3P%:
                  <span>{getPercentage(player.three_pa, player.three_pm)}</span>
                  <div className={styles.gpsStatsRowItemInfo}>
                    <span>Atempted: {player.three_pa}</span>
                    <span>Made: {player.three_pm}</span>
                  </div>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  FG%:
                  <span>
                    {getPercentage(
                      player.two_pa + player.three_pa,
                      player.two_pm + player.three_pm
                    )}
                  </span>
                  <div className={styles.gpsStatsRowItemInfo}>
                    <span>Atempted: {player.two_pa + player.three_pa}</span>
                    <span>Made: {player.two_pm + player.three_pm}</span>
                  </div>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  FT%:
                  <span>{getPercentage(player.fta, player.ftm)}</span>
                  <div className={styles.gpsStatsRowItemInfo}>
                    <span>Atempted: {player.fta}</span>
                    <span>Made: {player.ftm}</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* <div className={styles.gpsStatsRow}>
            <div className={styles.gpsStatsRowTitle}>Statistic:</div>
            <div className={styles.gpsStatsRowStats}>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  AST:
                  <span>{player.ast}</span>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  REB:
                  <span>{player.oreb + player.dreb}</span>
                  <div className={styles.gpsStatsRowItemInfo}>
                    <span>Offensive: {player.oreb}</span>
                    <span>Defensive: {player.dreb}</span>
                  </div>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  STL:
                  <span>{player.stl}</span>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  BLK:
                  <span>{player.blk}</span>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  TOV:
                  <span>{player.tov}</span>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  Fouls:
                  <span>{player.fouls}</span>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  Minutes:
                  <span>{player.minutes}</span>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  EFF:
                  <span>{getEfficiencyRate(player)}</span>
                </div>
              </div>
            </div>
            <div className={styles.gpsBadges}>{getBadges(player)}</div>
          </div> */}
        </div>
        <div className={styles.gpsCanvas}>
          <GamePlayerCanvas canvID={`canv_game-1_player-1`} />
        </div>
      </div>
    </div>
  );
}

export default AddGamePlayerStat;
