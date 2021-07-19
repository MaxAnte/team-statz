import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";

import GameCardCalendar from "../GameCardCalendar/GameCardCalendar";
import BlockLoader from "../Loader/BlockLoader";

import styles from "./stats.module.css";

function Stats() {
  const [games, setGames] = useState([]);
  const { loading, request } = useHttp();
  const getGames = async () => {
    try {
      const data = await request("/api/game/games", "POST", {});
      if (data) setGames(Object.values(data).filter((game) => !game.pending));
    } catch (e) {}
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="stats page-wrapper">
      <h2 className="title">Stats</h2>
      <div className={`${styles.statsWrap} ${loading ? styles.loading : ""}`}>
        {!loading ? (
          games &&
          games.map((game) => (
            <div className={styles.gameCard}>
              <Link
                to={`/stats/${game.enemy.replace(" ", "-")}-${game.date}`}
              />
              <GameCardCalendar game={game} />
              <span>{game.date}</span>
            </div>
          ))
        ) : (
          <BlockLoader />
        )}
      </div>
    </div>
  );
}

export default Stats;
