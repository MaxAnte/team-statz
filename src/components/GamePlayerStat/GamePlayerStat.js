import React from "react";
// import GamePlayerCanvas from "../GamePlayerCanvas/GamePlayerCanvas";

import "./GamePlayerStat.scss";

function GamePlayerStat({ player, allPlayers, gameID }) {
  const curPlayerArr = allPlayers.filter(item => item.id === player.id);
  const curPlayer = curPlayerArr[0];

  const getPercentage = (atempts, made) => {
    let perc = (made * 100) / atempts;
    return `${perc.toFixed(1)}%`;
  };

  const getEfficiencyRate = player => {
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
      tov
    } = player;
    const fga = two_pa + three_pa;
    const fgm = two_pm + three_pm;
    let perc =
      pts + oreb + dreb + ast + stl + blk - (fga - fgm + fta - ftm + tov);
    return `${perc.toFixed(1)}%`;
  };

  return (
    <div className="game__player_stat">
      <div className="gps__left">
        <img src={curPlayer.image_thumb} alt={curPlayer.name} />
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
                <p>
                  2P%:
                  <span>{getPercentage(player.two_pa, player.two_pm)}</span>
                  <div className="gps__stats--row__item--info">
                    <span>Atempted: {player.two_pa}</span>
                    <span>Made: {player.two_pm}</span>
                  </div>
                </p>
              </div>
              <div className="gps__stats--row__item">
                <p>
                  3P%:
                  <span>{getPercentage(player.three_pa, player.three_pm)}</span>
                  <div className="gps__stats--row__item--info">
                    <span>Atempted: {player.three_pa}</span>
                    <span>Made: {player.three_pm}</span>
                  </div>
                </p>
              </div>
              <div className="gps__stats--row__item">
                <p>
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
                </p>
              </div>
              <div className="gps__stats--row__item">
                <p>
                  FT%:
                  <span>{getPercentage(player.fta, player.ftm)}</span>
                  <div className="gps__stats--row__item--info">
                    <span>Atempted: {player.fta}</span>
                    <span>Made: {player.ftm}</span>
                  </div>
                </p>
              </div>
            </div>
          </div>

          <div className="gps__stats--row">
            <div className="gps__stats--row__title">Statistic:</div>
            <div className="gps__stats--row__stats">
              <div className="gps__stats--row__item">
                <p>
                  AST:
                  <span>{player.ast}</span>
                </p>
              </div>
              <div className="gps__stats--row__item">
                <p>
                  REB:
                  <span>{player.oreb + player.dreb}</span>
                  <div className="gps__stats--row__item--info">
                    <span>Offensive: {player.oreb}</span>
                    <span>Defensive: {player.dreb}</span>
                  </div>
                </p>
              </div>
              <div className="gps__stats--row__item">
                <p>
                  STL:
                  <span>{player.stl}</span>
                </p>
              </div>
              <div className="gps__stats--row__item">
                <p>
                  BLK:
                  <span>{player.blk}</span>
                </p>
              </div>
              <div className="gps__stats--row__item">
                <p>
                  TOV:
                  <span>{player.tov}</span>
                </p>
              </div>
              <div className="gps__stats--row__item">
                <p>
                  Fouls:
                  <span>{player.fouls}</span>
                </p>
              </div>
              <div className="gps__stats--row__item">
                <p>
                  Minutes:
                  <span>{player.minutes}</span>
                </p>
              </div>
              <div className="gps__stats--row__item">
                <p>
                  EFF:
                  <span>{getEfficiencyRate(player)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="gps__canvas">
          {/* <GamePlayerCanvas
            coordinates={player.coordinates}
            mode="view"
            canvID={`canv_game-${gameID}_player-${player.id}`}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default GamePlayerStat;
