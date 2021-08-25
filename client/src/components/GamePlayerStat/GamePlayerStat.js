import React, { useState, useEffect, useCallback } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useTranslation } from "react-i18next";

import GamePlayerCanvas from "../GamePlayerCanvas/GamePlayerCanvas";
import BlockLoader from "../Loader/BlockLoader";

import styles from "./gamePlayerStat.module.css";
import blankPhoto from "../../assets/images/players/blank-silhouette.png";

function GamePlayerStat({ player, gameID }) {
  const { loading, request } = useHttp();
  const [playerInfo, setPlayerInfo] = useState({
    name: "",
    position: "",
    image_thumb: "",
  });
  const { t } = useTranslation();

  const getPlayerById = useCallback(async () => {
    try {
      const data = await request("/api/player/id", "POST", { _id: player._id });
      if (Object.keys(data).length) setPlayerInfo(data);
    } catch (e) {}
  }, [request, player._id]);

  useEffect(() => {
    getPlayerById();
  }, [getPlayerById]);

  const getPercentage = (atempts, made) => {
    let perc = (made * 100) / atempts;
    return atempts ? `${parseFloat(perc.toFixed(1))}%` : !made ? "100%" : "0%";
  };

  const getEfficiencyRate = (player) => {
    const {
      pts,
      oreb,
      dreb,
      ast,
      stl,
      blk,
      two_pa,
      two_pm,
      three_pa,
      three_pm,
      fta,
      ftm,
      tov,
    } = player;
    const fga = two_pa + three_pa;
    const fgm = two_pm + three_pm;
    let perc =
      pts + oreb + dreb + ast + stl + blk - (fga - fgm + fta - ftm + tov);
    return `${parseFloat(perc.toFixed(1))}%`;
  };

  const getBadges = (player) => {
    let count = 0;
    let dreb = 0;
    const countableStats = ["pts", "dreb", "oreb", "ast", "blk", "stl"];
    const statsBadges = [
      "Double-Double",
      "Triple-Double",
      "Quadriple-Double",
      "Quntiple-Double",
    ];
    countableStats.forEach((key) => {
      if (key !== "dreb" && key !== "oreb" && player[key] >= 10) count++;
      if (key === "dreb") dreb = player[key];
      if (key === "oreb") dreb += player[key];
    });
    if (dreb >= 10) count++;
    return (
      <div
        className={`${styles.gpsBadgesItem} ${
          count <= 1 ? styles.gpsBadgesItemHidden : ""
        }`}
      >
        {statsBadges[count - 2]}
      </div>
    );
  };

  return (
    <div className={styles.gamePlayerStat}>
      <div className={styles.gpsLeft}>
        {loading ? (
          <BlockLoader />
        ) : (
          <>
            <img
              src={playerInfo.image_thumb ? playerInfo.image_thumb : blankPhoto}
              alt={playerInfo.name}
            />
            <h5>
              {playerInfo.name}, {playerInfo.position}
            </h5>
          </>
        )}
      </div>
      <div className={styles.gpsRight}>
        <div className={styles.gpsStats}>
          <div className={styles.gpsStatsRow}>
            <div className={styles.gpsStatsRowTitle}>
              {t("Points")}: {player.pts}
            </div>
            <div className={styles.gpsStatsRowStats}>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  {t("2P")}%:
                  <span>{getPercentage(player.two_pa, player.two_pm)}</span>
                  <div className={styles.gpsStatsRowItemInfo}>
                    <span>
                      {t("Attempted")}: {player.two_pa}
                    </span>
                    <span>
                      {t("Made")}: {player.two_pm}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  {t("3P")}%:
                  <span>{getPercentage(player.three_pa, player.three_pm)}</span>
                  <div className={styles.gpsStatsRowItemInfo}>
                    <span>
                      {t("Attempted")}: {player.three_pa}
                    </span>
                    <span>
                      {t("Made")}: {player.three_pm}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  {t("FG")}%:
                  <span>
                    {getPercentage(
                      player.two_pa + player.three_pa,
                      player.two_pm + player.three_pm
                    )}
                  </span>
                  <div className={styles.gpsStatsRowItemInfo}>
                    <span>
                      {t("Attempted")}: {player.two_pa + player.three_pa}
                    </span>
                    <span>
                      {t("Made")}: {player.two_pm + player.three_pm}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  {t("FT")}%:
                  <span>{getPercentage(player.fta, player.ftm)}</span>
                  <div className={styles.gpsStatsRowItemInfo}>
                    <span>
                      {t("Attempted")}: {player.fta}
                    </span>
                    <span>
                      {t("Made")}: {player.ftm}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.gpsStatsRow}>
            <div className={styles.gpsStatsRowTitle}>{t("Statistic")}:</div>
            <div className={styles.gpsStatsRowStats}>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  {t("AST")}:<span>{player.ast}</span>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  {t("REB")}:<span>{player.oreb + player.dreb}</span>
                  <div className={styles.gpsStatsRowItemInfo}>
                    <span>
                      {t("Offensive")}: {player.oreb}
                    </span>
                    <span>
                      {t("Defensive")}: {player.dreb}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  {t("STL")}:<span>{player.stl}</span>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  {t("BLK")}:<span>{player.blk}</span>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  {t("TOV")}:<span>{player.tov}</span>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  {t("Fouls")}:<span>{player.fouls}</span>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  {t("Minutes")}:<span>{player.minutes}</span>
                </div>
              </div>
              <div className={styles.gpsStatsRowItem}>
                <div>
                  {t("EFF")}:<span>{getEfficiencyRate(player)}</span>
                </div>
              </div>
            </div>
            <div className={styles.gpsBadges}>{getBadges(player)}</div>
          </div>
        </div>
        <div className={styles.gpsCanvas}>
          <GamePlayerCanvas
            coordinates={player.coordinates}
            mode="view"
            canvID={`canv_game-${gameID}_player-${player.id}`}
          />
        </div>
      </div>
    </div>
  );
}

export default GamePlayerStat;
