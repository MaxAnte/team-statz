import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";

import GameCard from "../GameCard/GameCard";
import Table from "../Table/Table";
import MiniLoader from "../Loader/MiniLoader";
import Select from "../Select/select";

import styles from "./games.module.css";

function Games() {
  const [games, setGames] = useState([]);
  const [sortedGames, setSortedGames] = useState(games);
  const [sort, setSort] = useState("All");
  const { loading, request, error, clearError } = useHttp();
  const { pathname, hash } = useLocation();
  const message = useMessage();
  const { t } = useTranslation();

  const getGames = useCallback(async () => {
    try {
      const data = await request("/api/game/games", "POST", {});
      if (Object.keys(data).length) setGames(data);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => getGames(), [getGames]);

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
  }, [pathname, hash]);

  useEffect(() => {
    setSortedGames(
      sort === "Pending"
        ? Object.values(games).filter((game) => game.pending)
        : sort === "Played"
        ? Object.values(games).filter((game) => !game.pending)
        : Object.values(games)
    );
  }, [sort, games]);

  const handleGetActive = useCallback((option) => setSort(option), []);
  const handleChangeGames = (gameID) =>
    setGames(games.filter((game) => game._id !== gameID));

  return (
    <div className="games page-wrapper">
      <h2 className="title">{t("Season standings")}</h2>
      <Table />
      <h2 className="title">{t("Recent Games")}</h2>
      <div className={styles.gamesWrapper}>
        {games.length ? (
          <Select
            options={["All", "Pending", "Played"]}
            className={styles.gamesSort}
            getActive={handleGetActive}
            defaultValue="All"
          />
        ) : null}
        {loading ? (
          <MiniLoader />
        ) : games.length ? (
          Object.values(sortedGames)
            .reverse()
            .map((game, id) => {
              return (
                <div className={styles.gamesItem} key={id} id={game.date}>
                  <GameCard game={game} handleChangeGames={handleChangeGames} />
                </div>
              );
            })
        ) : (
          <div className={styles.noGames}>
            {t("No games has been added yet")}. {t("Go to")}{" "}
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
