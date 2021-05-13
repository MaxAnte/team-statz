import React from "react";
import GamePlayerCanvas from "../GamePlayerCanvas/GamePlayerCanvas";

import "./GamePlayerStat.scss";
import blankPhoto from "../../assets/images/blank-silhouette.png";

function GamePlayerStat({player, allPlayers, gameID}) {
  const curPlayerArr = allPlayers.filter((item) => item.id === player.id);
  const curPlayer = curPlayerArr[0];

  const getPercentage = (atempts, made) => {
    let perc = (made * 100) / atempts;
    return `${perc.toFixed(1)}%`;
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
    return `${perc.toFixed(1)}%`;
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
    countableStats.map((key) => {
      if (player[key] >= 10) count++;
      if (key === "dreb") dreb = player[key];
      if (key === "oreb") dreb += player[key];
    });
    if (dreb >= 10) count++;
    return (
      <div className={`gps__badges--item ${count <= 1 ? "hidden" : ""}`}>
        {statsBadges[count - 2]}
      </div>
    );
  };
  // console.log(player);

  return (
    <div className="game__player_stat">
      <div className="gps__left">
        <img
          src={
            curPlayer.image_thumb === "" ? blankPhoto : curPlayer.image_thumb
          }
          alt={curPlayer.name}
        />
        <h5>
          {curPlayer.name}, {curPlayer.position}
        </h5>
      </div>
      <div className="gps__right">
        <div className="gps__stats">
          <div className="gps__stats--row">
            <div className="gps__stats--row__title">Points: {player.pts}</div>
            <div className="gps__stats--row__stats">
              <div className="gps__stats--row__item">
                <div>
                  2P%:
                  <span>{getPercentage(player.two_pa, player.two_pm)}</span>
                  <div className="gps__stats--row__item--info">
                    <span>Atempted: {player.two_pa}</span>
                    <span>Made: {player.two_pm}</span>
                  </div>
                </div>
              </div>
              <div className="gps__stats--row__item">
                <div>
                  3P%:
                  <span>{getPercentage(player.three_pa, player.three_pm)}</span>
                  <div className="gps__stats--row__item--info">
                    <span>Atempted: {player.three_pa}</span>
                    <span>Made: {player.three_pm}</span>
                  </div>
                </div>
              </div>
              <div className="gps__stats--row__item">
                <div>
                  FG%:
                  <span>
                    {getPercentage(
                      player.two_pa + player.three_pa,
                      player.two_pm + player.three_pm
                    )}
                  </span>
                  <div className="gps__stats--row__item--info">
                    <span>Atempted: {player.two_pa + player.three_pa}</span>
                    <span>Made: {player.two_pm + player.three_pm}</span>
                  </div>
                </div>
              </div>
              <div className="gps__stats--row__item">
                <div>
                  FT%:
                  <span>{getPercentage(player.fta, player.ftm)}</span>
                  <div className="gps__stats--row__item--info">
                    <span>Atempted: {player.fta}</span>
                    <span>Made: {player.ftm}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="gps__stats--row">
            <div className="gps__stats--row__title">Statistic:</div>
            <div className="gps__stats--row__stats">
              <div className="gps__stats--row__item">
                <div>
                  AST:
                  <span>{player.ast}</span>
                </div>
              </div>
              <div className="gps__stats--row__item">
                <div>
                  REB:
                  <span>{player.oreb + player.dreb}</span>
                  <div className="gps__stats--row__item--info">
                    <span>Offensive: {player.oreb}</span>
                    <span>Defensive: {player.dreb}</span>
                  </div>
                </div>
              </div>
              <div className="gps__stats--row__item">
                <div>
                  STL:
                  <span>{player.stl}</span>
                </div>
              </div>
              <div className="gps__stats--row__item">
                <div>
                  BLK:
                  <span>{player.blk}</span>
                </div>
              </div>
              <div className="gps__stats--row__item">
                <div>
                  TOV:
                  <span>{player.tov}</span>
                </div>
              </div>
              <div className="gps__stats--row__item">
                <div>
                  Fouls:
                  <span>{player.fouls}</span>
                </div>
              </div>
              <div className="gps__stats--row__item">
                <div>
                  Minutes:
                  <span>{player.minutes}</span>
                </div>
              </div>
              <div className="gps__stats--row__item">
                <div>
                  EFF:
                  <span>{getEfficiencyRate(player)}</span>
                </div>
              </div>
            </div>
            <div className="gps__badges">{getBadges(player)}</div>
          </div>
        </div>
        <div className="gps__canvas">
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
