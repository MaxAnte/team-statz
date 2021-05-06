import React from "react";

import "./GameCardCalendar.scss";

function GameCardCalendar({ game }) {
  return (
    <div className="calendar-game__card">
      <h4 className="calendar-game__name">vs. {game.enemy}</h4>
      <div className="calendar-game__score">
        <span
          className={`our ${game.ourScore > game.enemyScore ? "win" : "lose"}`}
        >
          {game.ourScore}
        </span>
        :<span>{game.enemyScore}</span>
      </div>
      {/* <div className="game__date">{game.date}</div> */}
    </div>
  );
}

export default GameCardCalendar;
