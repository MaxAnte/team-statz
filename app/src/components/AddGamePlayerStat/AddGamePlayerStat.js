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
            <div className={styles.gpsStatsRowStats}>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="playerPts">Points: </label>
                  <input type="number" min="0" id="playerPts" placeholder="0" />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="ast">AST: </label>
                  <input type="number" min="0" id="ast" placeholder="0" />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="dreb">DREB: </label>
                  <input type="number" min="0" id="dreb" placeholder="0" />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="dreb">OREB: </label>
                  <input type="number" min="0" id="oreb" placeholder="0" />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="stl">STL: </label>
                  <input type="number" min="0" id="stl" placeholder="0" />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="blk">BLK: </label>
                  <input type="number" min="0" id="blk" placeholder="0" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.gpsStatsRow}>
            <div className={styles.gpsStatsRowStats}>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="2pa">2p Attempted: </label>
                  <input type="number" min="0" id="2pa" placeholder="0" />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="2pm">2p Made: </label>
                  <input type="number" min="0" id="2pm" placeholder="0" />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="3pa">3p Attempted: </label>
                  <input type="number" min="0" id="3pa" placeholder="0" />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="3pm">3p Made: </label>
                  <input type="number" min="0" id="3pm" placeholder="0" />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="fta">FT Attempted: </label>
                  <input type="number" min="0" id="fta" placeholder="0" />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="ftm">FT Made: </label>
                  <input type="number" min="0" id="ftm" placeholder="0" />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.gpsStatsRow}>
            <div className={styles.gpsStatsRowStats}>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="tov">TOV: </label>
                  <input type="number" min="0" id="tov" placeholder="0" />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="fouls">Fouls: </label>
                  <input type="number" min="0" id="fouls" placeholder="0" />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="minutes">Minutes: </label>
                  <input type="number" min="0" id="minutes" placeholder="0" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.gpsCanvas}>
          <GamePlayerCanvas canvID={`canv_game-1_player-1`} />
        </div>
      </div>
    </div>
  );
}

export default AddGamePlayerStat;
