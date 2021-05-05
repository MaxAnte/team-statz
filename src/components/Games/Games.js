import React from "react";
import GameCard from "../GameCard/GameCard";
import Table from "../Table/Table";

import "./Games.css";

function Games({ store }) {
  const { players, games, teams } = store;
  return (
    <main>
      <h2 className="title">Standings</h2>
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
    </main>
  );
}

export default Games;
