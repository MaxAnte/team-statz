import React from "react";
import GameCard from "../GameCard/GameCard";
import Table from "../Table/Table";

import "./Games.css";

function Games({ store }) {
  const { players, games, teams } = store;
  return (
    <div className="games page-wrapper">
      <h2 className="title">Season standings</h2>
      <Table teams={teams} />
      <h2 className="title">Games</h2>
      <div className="games__wrapper">
        {games.map((game, id) => {
          return (
            <div className="games__item" key={id}>
              <GameCard game={game} players={players} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Games;
