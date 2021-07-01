import React, { useContext } from "react";
import GameCard from "../GameCard/GameCard";
import Table from "../Table/Table";
import { AuthContext } from "../../context/AuthContext";

import styles from "./games.module.css";

function Games({ store }) {
  const { players, games, teams } = store;
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="games page-wrapper">
      <h2 className="title">Season standings</h2>
      <Table teams={teams} />
      <h2 className="title">Games</h2>
      {isAuthenticated ? (
        <div className={styles.gamesAddBtn}>Add Game</div>
      ) : null}
      <div className={styles.gamesWrapper}>
        {games.map((game, id) => {
          return (
            <div className={styles.gamesItem} key={id}>
              <GameCard game={game} players={players} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Games;
