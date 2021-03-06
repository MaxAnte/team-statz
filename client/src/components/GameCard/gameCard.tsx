import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Game } from "../../app/app.types";

import { AppContext } from "../../app/app.provider";
import { SessionContext } from "../../session/session.provider";

import AddGamePopup from "../AddGamePopup/addGamePopup";
import EditGamePopup from "../EditGamePopup/editGamePopup";
import GamePlayerStat from "../GamePlayerStat/gamePlayerStat";
import MiniLoader from "../Loader/miniLoader";
import TableQuarters from "../TableQuarters/tableQuarters";

import EditIcon from "../../assets/icons/editIcon";
import RemoveIcon from "../../assets/icons/removeIcon";

import styles from "./gameCard.module.css";

type Props = {
  game: Game;
};

function GameCard({ game }: Props) {
  const { isAuthenticated } = useContext(SessionContext);
  const { deleteGame } = useContext(AppContext);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [addPopup, setAddPopup] = useState<boolean>(false);
  const [editPopup, setEditPopup] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    const today = new Date();
    const gameDay = new Date(`${game.date} ${game.time}`);
    if (today > gameDay) setEditMode(true);
  }, [game]);

  const closeHandler = () => {
    setAddPopup(false);
    setEditPopup(false);
  };

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
          isAuthenticated ? (
            <>
              <div
                className={`${styles.pendBtn} btn__main`}
                onClick={() => setAddPopup(true)}
              >
                {t("Complete game info")}
              </div>
              <div className={styles.gameDateAdmin}>{game.date}</div>
              {addPopup ? (
                <AddGamePopup
                  base={{
                    gameId: game._id,
                    date: game.date,
                    time: game.time,
                    enemy: game.enemy,
                    quarters: game.quarters,
                  }}
                  closeHandler={closeHandler}
                />
              ) : null}
            </>
          ) : (
            <div>
              <div className={styles.gameDate}>{game.date}</div>
              <span>{t("Waiting for info from that game")}</span>
              <MiniLoader />
            </div>
          )
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
          <div
            className={`${
              isAuthenticated ? styles.gameDateAdmin : styles.gameDate
            }`}
          >
            {game.date}
          </div>
          <TableQuarters quarters={game.quarters} gameId={game._id} />
          {game.playersStats.map((player) => (
            <GamePlayerStat player={player} key={`${game._id}-${player._id}`} />
          ))}
        </>
      )}
      {isAuthenticated ? (
        <div className={styles.editGameControls}>
          {game.ourScore ? (
            <button type="button" onClick={() => setEditPopup(true)}>
              <EditIcon width="24px" height="24px" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => deleteGame(game._id)}
            className={styles.removeBtn}
          >
            <RemoveIcon width="24px" height="24px" color="red" />
          </button>
          {editPopup ? (
            <EditGamePopup base={game} closeHandler={closeHandler} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default GameCard;
