import React from "react";

import "./GameCard.scss";

function GameCard({game}) {
  return (
    <div className="game__card">
      <h4 className="game__name">vs. {game.enemy}</h4>
      <div className="game__score">
        <span
          className={`our ${game.ourScore > game.enemyScore ? "win" : "lose"}`}
        >
          {game.ourScore}
        </span>
        :<span>{game.enemyScore}</span>
      </div>
      <div className="game__date">{game.date}</div>
    </div>
  );
}

export default GameCard;
