import React from "react";

import "./Table.scss";

function Table({ teams }) {
  const teamsWinRate = teams;
  teamsWinRate.forEach(el => {
    el.winRate = (el.wins * 100) / (el.wins + el.loses);
    el.points = el.wins * 2 + el.loses * 1;
  });
  teamsWinRate.sort((a, b) => b.winRate - a.winRate);

  return (
    <div className="table__wrap">
      <div className="table__head">
        <span className="table__row--pos">№</span>
        <p className="table__row--name">Team</p>
        <span className="table__row--wins">W</span>
        <span className="table__row--loses">L</span>
        <span className="table__row--points">Pts</span>
      </div>
      {teamsWinRate.map((el, i) => {
        return (
          <div className="table__row">
            <span className="table__row--pos">{++i}</span>
            <p className="table__row--name">{el.name}</p>
            <span className="table__row--wins">{el.wins}</span>
            <span className="table__row--loses">{el.loses}</span>
            <span className="table__row--points">{el.points}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Table;
