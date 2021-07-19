import React, { useState, useEffect, useContext } from "react";
import GamePlayerStat from "../GamePlayerStat/GamePlayerStat";
import { AuthContext } from "../../context/AuthContext";

import AddGamePopup from "../AddGamePopup/AddGamePopup";
import MiniLoader from "../Loader/MiniLoader";

import styles from "./gameCard.module.css";

function GameCard({ game }) {
  const [editMode, setEditMode] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const { date, time, enemy } = game;

  useEffect(() => {
    const today = new Date();
    const gameDay = new Date(date);
    if (today > gameDay) setEditMode(true);
  }, []);

  const handleEdit = () => setAddPopup(true);
  const closeHandler = () => setAddPopup(false);

  return (
    <div
      className={`${styles.gameCard} ${
        game.pending && !editMode ? styles.pendingCard : ""
      }`}
    >
      <h4 className={styles.gameName}>vs. {game.enemy}</h4>
      {game.pending ? (
        editMode ? (
          <>
            {isAuthenticated ? (
              <>
                <div className="btn__main" onClick={() => handleEdit()}>
                  Edit game info
                </div>
                <div className={styles.gameDate}>{game.date}</div>
                {addPopup ? (
                  <AddGamePopup
                    base={{ date, enemy }}
                    closeHandler={closeHandler}
                  />
                ) : null}
              </>
            ) : (
              <div>
                <span>Waiting for info from that game</span>
                <MiniLoader />
              </div>
            )}
          </>
        ) : (
          <span>
            Game will be played {game.date} at {game.time}
          </span>
        )
      ) : (
        <>
          <div className={styles.gameScore}>
            <span
              className={`our ${
                game.ourScore > game.enemyScore ? styles.win : styles.lose
              }`}
            >
              {game.ourScore}
            </span>
            :<span>{game.enemyScore}</span>
          </div>
          <div className={styles.gameDate}>{game.date}</div>
          {game.playersStats.map((player) => {
            return (
              <GamePlayerStat
                player={player}
                gameID={game._id}
                key={player._id}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default GameCard;
