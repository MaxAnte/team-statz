import React from "react";

import logo from "../../assets/images/logo-bc.png";

import "./TeamInfo.scss";

function TeamInfo({data}) {
  const {games, players} = data;
  const arrTotals = Array(4).fill(0);
  const properties = ["REB", "AST", "BLK", "STL"];
  let offensiveRating = 0;
  let defensiveRating = 0;
  let winsCount = 0;
  players.forEach(el => {
    arrTotals[0] += el.reb;
    arrTotals[1] += el.ast;
    arrTotals[2] += el.blk;
    arrTotals[3] += el.stl;
  });
  games.forEach(el => {
    if (el.ourScore > el.enemyScore) winsCount++;
    offensiveRating += el.ourScore / games.length;
    defensiveRating += el.enemyScore / games.length;
  });

  return (
    <>
      <div className="team__info--left">
        <img src={logo} alt="BC logo" />
      </div>
      <div className="team__info--right">
        <p>GP: {games.length}</p>
        <p>
          W/L: {winsCount}/{games.length - winsCount}
        </p>
        <p>ORtg: {offensiveRating}</p>
        <p>DRtg: {defensiveRating}</p>
        {arrTotals.map((el, i) => {
          return (
            <p>
              <span>{properties[i]}: </span>
              {(el / games.length).toFixed(1)}
            </p>
          );
        })}
      </div>
    </>
  );
}

export default TeamInfo;
