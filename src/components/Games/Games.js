import React from "react";
import GameCard from "../GameCard/GameCard";

import "./Games.css";

function Games({games}) {
  // console.log(games);

  return (
    <main>
      <h2 className="title">Games</h2>
      <div className="games__wrapper">
        {games.map((game, id) => {
          return (
            <div className="games__item">
              <GameCard game={game} key={id} />
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Games;
