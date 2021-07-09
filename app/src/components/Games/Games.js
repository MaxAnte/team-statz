import React, { useState, useContext } from "react";
import GameCard from "../GameCard/GameCard";
import Table from "../Table/Table";
import { AuthContext } from "../../context/AuthContext";
import AddGamePopup from "../AddGamePopup/AddGamePopup";

import styles from "./games.module.css";

function Games({ store }) {
  const [addPopup, setAddPopup] = useState(false);
  const { players, games, teams } = store;
  const { isAuthenticated } = useContext(AuthContext);
  const closeHandler = () => setAddPopup(false);
  return (
    <div className="games page-wrapper">
      <h2 className="title">Season standings</h2>
      <Table />
      <h2 className="title">Games</h2>
      {isAuthenticated ? (
        <div className={styles.gamesAddBtn} onClick={() => setAddPopup(true)}>
          Add Game
        </div>
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
      {isAuthenticated && addPopup ? (
        <AddGamePopup closeHandler={closeHandler} />
      ) : null}
    </div>
  );
}

export default Games;
