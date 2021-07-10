import React, { useState, useEffect } from "react";
import GamePlayerCanvas from "../GamePlayerCanvas/GamePlayerCanvas";

import styles from "./addGamePlayerStat.module.css";
import blankPhoto from "../../assets/images/players/blank-silhouette.png";

function AddGamePlayerStat({ playerID, handleChangePlayerStats }) {
  const [playerStats, setPlayerStats] = useState({});

  const handleChangeStats = (e) => {
    setPlayerStats((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleGetCoords = (coords) =>
    setPlayerStats((prevState) => ({ ...prevState, coordinates: coords }));

  useEffect(() => {
    handleChangePlayerStats(playerID, playerStats);
  }, [playerStats]);

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
                  <input
                    type="number"
                    min="0"
                    id="playerPts"
                    name="pts"
                    placeholder="0"
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="ast">AST: </label>
                  <input
                    type="number"
                    min="0"
                    id="ast"
                    name="ast"
                    placeholder="0"
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="dreb">DREB: </label>
                  <input
                    type="number"
                    min="0"
                    id="dreb"
                    name="dreb"
                    placeholder="0"
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="dreb">OREB: </label>
                  <input
                    type="number"
                    min="0"
                    id="oreb"
                    name="oreb"
                    placeholder="0"
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="stl">STL: </label>
                  <input
                    type="number"
                    min="0"
                    id="stl"
                    name="stl"
                    placeholder="0"
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="blk">BLK: </label>
                  <input
                    type="number"
                    min="0"
                    id="blk"
                    name="blk"
                    placeholder="0"
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.gpsStatsRow}>
            <div className={styles.gpsStatsRowStats}>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="two_pa">2p Attempted: </label>
                  <input
                    type="number"
                    min="0"
                    id="two_pa"
                    name="two_pa"
                    placeholder="0"
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="two_pm">2p Made: </label>
                  <input
                    type="number"
                    min="0"
                    id="two_pm"
                    name="two_pm"
                    placeholder="0"
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="three_pa">3p Attempted: </label>
                  <input
                    type="number"
                    min="0"
                    id="three_pa"
                    name="three_pa"
                    placeholder="0"
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="three_pm">3p Made: </label>
                  <input
                    type="number"
                    min="0"
                    id="three_pm"
                    name="three_pm"
                    placeholder="0"
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="fta">FT Attempted: </label>
                  <input
                    type="number"
                    min="0"
                    id="fta"
                    name="fta"
                    placeholder="0"
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="ftm">FT Made: </label>
                  <input
                    type="number"
                    min="0"
                    id="ftm"
                    name="ftm"
                    placeholder="0"
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.gpsStatsRow}>
            <div className={styles.gpsStatsRowStats}>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="tov">TOV: </label>
                  <input
                    type="number"
                    min="0"
                    id="tov"
                    name="tov"
                    placeholder="0"
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="fouls">Fouls: </label>
                  <input
                    type="number"
                    min="0"
                    id="fouls"
                    name="fouls"
                    placeholder="0"
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="minutes">Minutes: </label>
                  <input
                    type="number"
                    min="0"
                    id="minutes"
                    name="minutes"
                    placeholder="0"
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.gpsCanvas}>
          <GamePlayerCanvas
            canvID={`canv_game-1_player-1`}
            handleGetCoords={handleGetCoords}
          />
        </div>
      </div>
    </div>
  );
}

export default AddGamePlayerStat;
