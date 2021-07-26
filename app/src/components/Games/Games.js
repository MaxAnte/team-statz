import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useTranslation } from "react-i18next";

import GameCard from "../GameCard/GameCard";
import Table from "../Table/Table";
import MiniLoader from "../Loader/MiniLoader";
import Select from "../Select/select";

import styles from "./games.module.css";

function Games() {
  const [games, setGames] = useState(undefined);
  const [sort, setSort] = useState("All");
  const { loading, request } = useHttp();
  const { pathname, hash } = useLocation();
  const { t } = useTranslation();

  const getGames = async () => {
    try {
      const data = await request("/api/game/games", "POST", {});
      if (data) setGames(data);
    } catch (e) {}
  };

  useEffect(() => getGames(), []);

  useEffect(() => {
    if (hash === "") {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);
    }
  }, [pathname]);

  const gamesList = games
    ? sort === "Pending"
      ? Object.values(games).filter((game) => game.pending)
      : sort === "Played"
      ? Object.values(games).filter((game) => !game.pending)
      : Object.values(games)
    : [];

  const handleGetActive = (option) => setSort(option);

  return (
    <div className="games page-wrapper">
      <h2 className="title">{t("Season standings")}</h2>
      <Table />
      <h2 className="title">{t("Recent Games")}</h2>
      <div className={styles.gamesWrapper}>
        {gamesList.length ? (
          <Select
            options={["All", "Pending", "Played"]}
            className={styles.gamesSort}
            getActive={handleGetActive}
            defaultValue="All"
          />
        ) : null}
        {loading ? (
          <MiniLoader />
        ) : gamesList.length ? (
          gamesList.reverse().map((game, id) => {
            return (
              <div className={styles.gamesItem} key={id} id={game.date}>
                <GameCard game={game} />
              </div>
            );
          })
        ) : (
          <div className={styles.noGames}>
            {t("No games has been added yet. Go to")}
            <Link to="/schedule">
              <strong>{t("Schedule")}</strong>
            </Link>{" "}
            {t("and add Game!")}
          </div>
        )}
      </div>
    </div>
  );
}

export default Games;
