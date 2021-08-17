import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";

import PlayerCanvas from "../PlayerCanvas/PlayerCanvas";
import BlockLoader from "../Loader/BlockLoader";

import styles from "./player.module.css";

function Player() {
  const [player, setPlayer] = useState({});
  const [games, setGames] = useState([]);
  const { id } = useParams();
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();
  const { t } = useTranslation();

  const getDB = async () => {
    const playerData = await request("/api/player/id", "POST", { _id: id });
    const gamesData = await request("/api/game/games", "POST", {});
    if (gamesData && playerData) {
      setPlayer(playerData);
      setGames(gamesData);
    }
  };
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    getDB();
  }, []);

  return (
    <div className="player page-wrapper">
      {loading ? (
        <BlockLoader />
      ) : (
        <div className={styles.top}>
          <img src={player.image_thumb} />
          <div className={styles.info}>
            <h2 className={styles.name}>{player.name}</h2>
            <p className={styles.general}>
              6'6", 216 lbs | {player.position}, #{player.number}
            </p>
            <p className={styles.general}>
              <strong>Born:</strong> February 17, 1963 in Brooklyn, NY
            </p>
            <p className={styles.general}>
              <strong>Experience:</strong> 15 years
            </p>
            <p className={styles.general}>
              <strong>Seasons in team:</strong> 5
            </p>
            <ul className={styles.general}>
              <strong>Best totals:</strong>

              <li>
                <strong>Points:</strong> 35.5 <span>(2020-2021)</span>
              </li>
              <li>
                <strong>Rebounds:</strong> 7.1 <span>(2018-2019)</span>
              </li>
              <li>
                <strong>Asists:</strong> 10.2 <span>(2015-2016)</span>
              </li>
              <li>
                <strong>Steals:</strong> 1.6 <span>(2016-2017)</span>
              </li>
              <li>
                <strong>Blocks:</strong> 0.2 <span>(2020-2021)</span>
              </li>
            </ul>
          </div>
          <div className={styles.zones}>
            <PlayerCanvas player={player._id} games={games} />
            {/* <div className={styles.seasons}>
              <span>2019</span>
              <span className={styles.activeSeason}>2020</span>
              <span>2021</span>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Player;
