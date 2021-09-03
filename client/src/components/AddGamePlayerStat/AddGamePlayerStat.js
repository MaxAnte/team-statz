import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import GamePlayerCanvas from "../GamePlayerCanvas/GamePlayerCanvas";

import styles from "./addGamePlayerStat.module.css";
import blankPhoto from "../../assets/images/players/blank-silhouette.png";

function AddGamePlayerStat({
  player,
  basePlayer = {},
  handleChangePlayerStats,
}) {
  const [playerStats, setPlayerStats] = useState(basePlayer);
  const { t } = useTranslation();

  const handleChangeStats = (e) => {
    setPlayerStats((prevState) => ({
      ...prevState,
      _id: player._id,
      [e.target.name]: +e.target.value,
    }));
  };
  const handleGetCoords = (coords) => {
    setPlayerStats((prevState) => ({
      ...prevState,
      coordinates: coords.filter((el) => el.x > 0 && el.y > 0),
    }));
  };

  useEffect(() => {
    handleChangePlayerStats(player._id, playerStats);
  }, [playerStats]);

  return (
    <div className={styles.gamePlayerStat}>
      <div className={styles.gpsLeft}>
        <img
          src={player.image_thumb ? player.image_thumb : blankPhoto}
          alt={player.name}
        />
        <h5>
          {player.name}, {player.position}
        </h5>
      </div>
      <div className={styles.gpsRight}>
        <div className={styles.gpsStats}>
          <div className={styles.gpsStatsRow}>
            <div className={styles.gpsStatsRowStats}>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="playerPts">{t("Points")}: </label>
                  <input
                    type="number"
                    min="0"
                    id="playerPts"
                    name="pts"
                    placeholder={basePlayer.pts || "0"}
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="ast">{t("AST")}: </label>
                  <input
                    type="number"
                    min="0"
                    id="ast"
                    name="ast"
                    placeholder={basePlayer.ast || "0"}
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="dreb">{t("DREB")}: </label>
                  <input
                    type="number"
                    min="0"
                    id="dreb"
                    name="dreb"
                    placeholder={basePlayer.dreb || "0"}
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="dreb">{t("OREB")}: </label>
                  <input
                    type="number"
                    min="0"
                    id="oreb"
                    name="oreb"
                    placeholder={basePlayer.oreb || "0"}
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="stl">{t("STL")}: </label>
                  <input
                    type="number"
                    min="0"
                    id="stl"
                    name="stl"
                    placeholder={basePlayer.stl || "0"}
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="blk">{t("BLK")}: </label>
                  <input
                    type="number"
                    min="0"
                    id="blk"
                    name="blk"
                    placeholder={basePlayer.blk || "0"}
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
                  <label htmlFor="two_pa">{t("2p Attempted")}: </label>
                  <input
                    type="number"
                    min="0"
                    id="two_pa"
                    name="two_pa"
                    placeholder={basePlayer.two_pa || "0"}
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="two_pm">{t("2p Made")}: </label>
                  <input
                    type="number"
                    min="0"
                    id="two_pm"
                    name="two_pm"
                    placeholder={basePlayer.two_pm || "0"}
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="three_pa">{t("3p Attempted")}: </label>
                  <input
                    type="number"
                    min="0"
                    id="three_pa"
                    name="three_pa"
                    placeholder={basePlayer.three_pa || "0"}
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="three_pm">{t("3p Made")}: </label>
                  <input
                    type="number"
                    min="0"
                    id="three_pm"
                    name="three_pm"
                    placeholder={basePlayer.three_pm || "0"}
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="fta">{t("FT Attempted")}: </label>
                  <input
                    type="number"
                    min="0"
                    id="fta"
                    name="fta"
                    placeholder={basePlayer.fta || "0"}
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="ftm">{t("FT Made")}: </label>
                  <input
                    type="number"
                    min="0"
                    id="ftm"
                    name="ftm"
                    placeholder={basePlayer.ftm || "0"}
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
                  <label htmlFor="tov">{t("TOV")}: </label>
                  <input
                    type="number"
                    min="0"
                    id="tov"
                    name="tov"
                    placeholder={basePlayer.tov || "0"}
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="fouls">{t("Fouls")}: </label>
                  <input
                    type="number"
                    min="0"
                    id="fouls"
                    name="fouls"
                    placeholder={basePlayer.fouls || "0"}
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="minutes">{t("Minutes")}: </label>
                  <input
                    type="number"
                    min="0"
                    id="minutes"
                    name="minutes"
                    placeholder={basePlayer.minutes || "0"}
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  <label htmlFor="plus_minus">{"+/-"} : </label>
                  <input
                    type="number"
                    id="plus_minus"
                    name="plus_minus"
                    placeholder={basePlayer.plus_minus || "0"}
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.gpsCanvas}>
          <GamePlayerCanvas
            coordinates={basePlayer.coordinates}
            handleGetCoords={handleGetCoords}
          />
        </div>
      </div>
    </div>
  );
}

export default AddGamePlayerStat;
