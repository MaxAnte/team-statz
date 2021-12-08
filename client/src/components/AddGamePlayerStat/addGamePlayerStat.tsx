import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Coord, Player, PlayerStats } from "../../app/app.types";

import GamePlayerCanvas from "../GamePlayerCanvas/gamePlayerCanvas";
import SubstitutionInput from "../SubstitutionInput/substitutionInput";

import StarIcon from "../../assets/icons/starIcon";

import blankPhoto from "../../assets/images/players/blank-silhouette.png";

import styles from "./addGamePlayerStat.module.css";

type Props = {
  player: Player;
  basePlayer?: PlayerStats;
  handleChangePlayerStats: (id: string, playerStats: PlayerStats) => void;
};

function AddGamePlayerStat({
  player,
  basePlayer,
  handleChangePlayerStats,
}: Props) {
  const [playerStats, setPlayerStats] = useState<PlayerStats | undefined>(
    basePlayer
  );
  const [isStarter, setIsStarter] = useState(
    basePlayer ? basePlayer.gs : false
  );
  const { t } = useTranslation();

  const handleChangeStats = (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    setPlayerStats((prevState) => ({
      ...prevState,
      _id: player._id,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const handleCheckStarter = () => {
    //@ts-ignore
    setPlayerStats((prevState) => ({
      ...prevState,
      gs: !isStarter,
    }));
    setIsStarter(!isStarter);
  };

  const handleGetCoords = (coords: Coord[]) => {
    setPlayerStats((prevState) => {
      if (prevState)
        return {
          ...prevState,
          coordinates: coords.filter((el) => el.x > 0 && el.y > 0),
        };
      return prevState;
    });
  };

  const handleGetSubstitutions = useCallback((minutes: string[]) => {
    setPlayerStats((prevState) => {
      if (prevState)
        return {
          ...prevState,
          minutes,
        };
      return prevState;
    });
  }, []);

  useEffect(() => {
    if (playerStats) handleChangePlayerStats(player._id, playerStats);
  }, [playerStats, player._id, handleChangePlayerStats]);

  return (
    <div className={styles.gamePlayerStat}>
      <div className={styles.gpsLeft}>
        <StarIcon
          width={"34"}
          height={"34"}
          className={`${styles.starterIcon} ${
            isStarter ? styles.staterFilled : styles.staterEmpty
          }`}
          onClick={handleCheckStarter}
        />
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
                    placeholder={basePlayer?.pts.toString() || "0"}
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
                    placeholder={basePlayer?.ast.toString() || "0"}
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
                    placeholder={basePlayer?.dreb.toString() || "0"}
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
                    placeholder={basePlayer?.oreb.toString() || "0"}
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
                    placeholder={basePlayer?.stl.toString() || "0"}
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
                    placeholder={basePlayer?.blk.toString() || "0"}
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
                    placeholder={basePlayer?.two_pa.toString() || "0"}
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
                    placeholder={basePlayer?.two_pm.toString() || "0"}
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
                    placeholder={basePlayer?.three_pa.toString() || "0"}
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
                    placeholder={basePlayer?.three_pm.toString() || "0"}
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
                    placeholder={basePlayer?.fta.toString() || "0"}
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
                    placeholder={basePlayer?.ftm.toString() || "0"}
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
                    placeholder={basePlayer?.tov.toString() || "0"}
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
                    placeholder={basePlayer?.fouls.toString() || "0"}
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
                    placeholder={basePlayer?.plus_minus.toString() || "0"}
                    onChange={handleChangeStats}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.gpsStatsRow}>
            <div className={styles.gpsStatsRowItem}>
              <SubstitutionInput
                isStarter={isStarter}
                base={basePlayer?.minutes}
                getSubstitutions={handleGetSubstitutions}
              />
            </div>
          </div>
        </div>
        <div className={styles.gpsCanvas}>
          <GamePlayerCanvas
            coordinates={basePlayer?.coordinates}
            handleGetCoords={handleGetCoords}
          />
        </div>
      </div>
    </div>
  );
}

export default AddGamePlayerStat;
