import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";

import GameCard from "../GameCard/GameCard";
import Table from "../Table/Table";
import AddGamePopup from "../AddGamePopup/AddGamePopup";
import MiniLoader from "../Loader/MiniLoader";

import styles from "./games.module.css";

function Games() {
  const [addPopup, setAddPopup] = useState(false);
  const [games, setGames] = useState(undefined);
  const { loading, request } = useHttp();
  const { isAuthenticated } = useContext(AuthContext);

  const getGames = async () => {
    try {
      const data = await request("/api/game/games", "POST", {});
      if (data) setGames(data);
    } catch (e) {}
  };

  useEffect(() => {
    getGames();
  }, []);

  const gamesList = games ? Object.values(games) : [];

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
        {loading ? (
          <MiniLoader />
        ) : (
          gamesList.reverse().map((game, id) => {
            return (
              <div className={styles.gamesItem} key={id}>
                <GameCard game={game} />
              </div>
            );
          })
        )}
      </div>
      {isAuthenticated && addPopup ? (
        <AddGamePopup closeHandler={closeHandler} />
      ) : null}
    </div>
  );
}

export default Games;
