import React, { useState, useCallback, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook.tsx";
import { useMessage } from "../../hooks/message.hook.tsx";
import { useTranslation } from "react-i18next";
import { TEAMNAME } from "../../project.const";

import AddGamePlayerStat from "../AddGamePlayerStat/AddGamePlayerStat";
import TableQuarters from "../TableQuarters/tableQuarters.tsx";
import MiniLoader from "../Loader/miniLoader.tsx";

import CloseIcon from "../../assets/icons/closeIcon.tsx";
import CheckIcon from "../../assets/icons/checkIcon.tsx";

import styles from "./addGamePopup.module.css";

import blankPhoto from "../../assets/images/players/blank-silhouette.png";

function AddGamePopup({ closeHandler, base }) {
  const [players, setPlayers] = useState([]);
  const [checkListAccept, setCheckListAccept] = useState(false);
  const [form, setForm] = useState({ playersStats: [] });
  const [formClose, setFormClose] = useState(false);
  const [playersStatsArr, setPlayersStatsArr] = useState([]);
  const message = useMessage();
  const { t } = useTranslation();
  const { request, error, clearError } = useHttp();

  const handleCheck = (index) => {
    const checkSet = players;
    checkSet[index].check = !checkSet[index].check;
    setPlayers((prevState) => ({ ...prevState, ...checkSet }));
  };

  const getPlayers = useCallback(async () => {
    try {
      const data = await request("/api/player/players", "POST", {});
      if (Object.keys(data).length) setPlayers(Object.values(data));
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    setForm((prevState) => ({ ...prevState, ...base }));
    getPlayers();
    if (players.length) setPlayersStatsArr(players.filter((el) => !!el.check));
  }, [getPlayers]);

  useEffect(() => {
    gatherGameInfo(Object.values(playersStatsArr));
  }, [playersStatsArr]);

  const handleChangeInput = (e) =>
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const handleChangePlayerStats = (playerID, playersStats) => {
    setPlayersStatsArr((prevState) => ({
      ...prevState,
      [playerID]: playersStats,
    }));
  };

  const gatherGameInfo = (gameInfo) =>
    setForm((prevState) => ({
      ...prevState,
      playersStats: gameInfo,
    }));

  const handleGetQuarters = (quarters) =>
    setForm((prevState) => ({
      ...prevState,
      quarters,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request("/api/game/complete-game", "POST", {
        ...form,
      });
      setFormClose(true);
    } catch (e) {
      message(t("Something is missing..."));
      clearError();
    }
  };

  return (
    <div className={styles.popupWrap}>
      <div
        className={`${styles.popupContainer} ${
          formClose ? styles.centerAlign : ""
        }`}
      >
        {!formClose ? (
          <>
            <h3 className={styles.popupTitle}>{t("Add Game Stats")}</h3>
            <form className={styles.addGameForm} onSubmit={handleSubmit}>
              <h4 className={styles.popupSubtitle}>
                {t("Set general game information")}
              </h4>
              <div className={styles.popupSection}>
                <div className={styles.genGameInfo}>
                  <span className={styles.genGameInfoNames}>{TEAMNAME}</span>
                  <input
                    type="text"
                    maxLength="3"
                    name="ourScore"
                    id="ourScore"
                    placeholder="0"
                    className={styles.genGameInfoScore}
                    onChange={handleChangeInput}
                    required
                  />
                  <span>:</span>
                  <input
                    type="text"
                    maxLength="3"
                    name="enemyScore"
                    id="enemyScore"
                    placeholder="0"
                    className={styles.genGameInfoScore}
                    onChange={handleChangeInput}
                    required
                  />
                  <span className={styles.genGameInfoNames}>{base.enemy}</span>
                </div>
                <TableQuarters
                  mode="edit"
                  handleGetQuarters={handleGetQuarters}
                />
              </div>

              <h4 className={styles.popupSubtitle}>
                {t("Check players that have played that game")}
              </h4>
              <div className={styles.popupSection}>
                {!Object.values(players).length ? (
                  <MiniLoader />
                ) : (
                  <div className={styles.playersSelect}>
                    {Object.values(players).map((player, i) => (
                      <div
                        key={`${player.name}_${i}`}
                        className={styles.playerCard}
                        onClick={() => handleCheck(i)}
                      >
                        <img
                          src={
                            player.image_thumb ? player.image_thumb : blankPhoto
                          }
                          alt={player.name}
                        />
                        <span>
                          {player.name}, {player.position}
                        </span>
                        <div
                          className={`${styles.playerCheck} ${
                            player.check ? styles.playerCheckActive : ""
                          }`}
                        >
                          <CheckIcon width="14px" height="14px" color="green" />
                        </div>
                        {!player.check ? (
                          <div className={styles.disabler}></div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
                {Object.values(players).length && !checkListAccept ? (
                  <button
                    className={`btn__main ${styles.playersSelectAccept}`}
                    onClick={() => setCheckListAccept(true)}
                  >
                    {t("Save")}
                  </button>
                ) : null}
              </div>

              {Object.values(players).length && !checkListAccept ? (
                <span>{t("Check players above")}</span>
              ) : null}
              {checkListAccept ? (
                <>
                  <h4 className={styles.popupSubtitle}>
                    {t("Add stats to each player")}
                  </h4>
                  <div className={styles.popupSection}>
                    {Object.values(players)
                      .filter((player) => player.check)
                      .map((player, i) => (
                        <div
                          key={`playerName_${i}`}
                          className={styles.gpsPlayer}
                        >
                          <AddGamePlayerStat
                            player={player}
                            handleChangePlayerStats={handleChangePlayerStats}
                          />
                        </div>
                      ))}
                  </div>
                  <button className="btn__main">{t("Save game info")}</button>
                </>
              ) : null}
            </form>
          </>
        ) : (
          <span className={styles.successMessage}>
            {t("Information about game has been added successfully!")}
          </span>
        )}
        <div className={styles.closeBtn} onClick={() => closeHandler()}>
          <CloseIcon width="20px" height="20px" color="black" />
        </div>
      </div>
    </div>
  );
}

export default AddGamePopup;
