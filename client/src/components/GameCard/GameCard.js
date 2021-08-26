import React, { useState, useEffect, useContext } from "react";
import GamePlayerStat from "../GamePlayerStat/GamePlayerStat";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

import AddGamePopup from "../AddGamePopup/AddGamePopup";
import TableQuarters from "../TableQuarters/TableQuarters";
import MiniLoader from "../Loader/MiniLoader";

import EditIcon from "../../assets/icons/EditIcon";

import styles from "./gameCard.module.css";

function GameCard({ game }) {
  const [editMode, setEditMode] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const { t } = useTranslation();

  const { date, enemy } = game;

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
      <h4 className={styles.gameName}>
        {t("vs.")} {game.enemy}
      </h4>
      {game.pending ? (
        editMode ? (
          <>
            {isAuthenticated ? (
              <>
                <div
                  className={`${styles.pendBtn} btn__main`}
                  onClick={() => handleEdit()}
                >
                  {t("Complete game info")}
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
                <span>{t("Waiting for info from that game")}</span>
                <MiniLoader />
              </div>
            )}
          </>
        ) : (
          <span>
            {t("Game will be played")} {game.date} {t("at")} {game.time}
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
          <TableQuarters quarters={game.quarters} />
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
      {isAuthenticated && game.ourScore ? (
        <div className={styles.editGameInfoBtn}>
          <button type="button" onClick={() => setAddPopup(true)}>
            <EditIcon width="24px" height="24px" />
          </button>
          {addPopup ? (
            <AddGamePopup base={game} closeHandler={closeHandler} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default GameCard;
