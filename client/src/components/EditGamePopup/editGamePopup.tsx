import React, { useState, useCallback, useEffect, useContext } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";
import { TEAMNAME } from "../../project.const";
import { Game, Player, PlayerStats, Quarter } from "../../context/app.types";
import { AppContext } from "../../context/app.provider";

import AddGamePlayerStat from "../AddGamePlayerStat/addGamePlayerStat";
import MiniLoader from "../Loader/miniLoader";
import TableQuarters from "../TableQuarters/tableQuarters";

import CloseIcon from "../../assets/icons/closeIcon";
import CheckIcon from "../../assets/icons/checkIcon";

import styles from "./EditGamePopup.module.css";

import blankPhoto from "../../assets/images/players/blank-silhouette.png";

type Props = {
  closeHandler: () => void;
  base: Game;
};

function EditGamePopup({ closeHandler, base }: Props) {
  const { getPlayers, players, editGame } = useContext(AppContext);
  const [playersList, setPlayersList] = useState<Player[]>(players);
  const [form, setForm] = useState<Partial<Game>>({ playersStats: [] });
  const [formClose, setFormClose] = useState<boolean>(false);
  const [playersStatsArr, setPlayersStatsArr] = useState<
    PlayerStats[] | Player[]
  >([]);
  const message = useMessage();
  const { t } = useTranslation();

  const handleCheck = (index: number) => {
    const checkSet = players;
    checkSet[index].check = !checkSet[index].check;
    setPlayersList((prevState) => ({ ...prevState, ...checkSet }));
  };

  const getPlayersList = useCallback(async () => {
    try {
      const response = await getPlayers();
      if (response?.length) {
        response.map((player) => {
          base.playersStats.forEach((p) => {
            if (player._id === p._id) {
              player.check = true;
            }
          });
          return player;
        });
        setPlayersList(response);
      }
    } catch (e) {}
  }, [base.playersStats]);

  useEffect(() => {
    setForm((prevState) => ({ ...prevState, ...base }));
    getPlayersList();
  }, [getPlayers, base]);

  const handleChangePlayerStats = (
    playerID: string,
    playersStats: PlayerStats
  ) => {
    setPlayersStatsArr((prevState) => ({
      ...prevState,
      [playerID]: playersStats,
    }));
  };

  const gatherGameInfo = (gameInfo: PlayerStats[]) => {
    setForm((prevState) => ({
      ...prevState,
      playersStats: gameInfo,
    }));
  };

  useEffect(() => {
    gatherGameInfo(Object.values(playersStatsArr));
  }, [playersStatsArr]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const handleGetQuarters = (quarters: Quarter[]) =>
    setForm((prevState) => ({
      ...prevState,
      quarters,
    }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const onlyCheckedPlayers = form;
      onlyCheckedPlayers.playersStats = form?.playersStats?.filter(
        (p) => playersList.filter((pid) => pid._id === p._id)[0].check
      );
      await editGame(onlyCheckedPlayers);
      setFormClose(true);
    } catch (e) {
      message(t("Something is missing..."));
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
            <h3 className={styles.popupTitle}>{t("Edit game info")}</h3>
            <form className={styles.addGameForm} onSubmit={handleSubmit}>
              <h4 className={styles.popupSubtitle}>
                {t("General game information")}
              </h4>
              <div className={styles.popupSection}>
                <div className={styles.genGameInfo}>
                  <span className={styles.genGameInfoNames}>{TEAMNAME}</span>
                  <input
                    type="text"
                    maxLength={3}
                    name="ourScore"
                    id="ourScore"
                    className={styles.genGameInfoScore}
                    onChange={handleChangeInput}
                    placeholder={`${base.ourScore}` || ""}
                  />
                  <span>:</span>
                  <input
                    type="text"
                    maxLength={3}
                    name="enemyScore"
                    id="enemyScore"
                    className={styles.genGameInfoScore}
                    onChange={handleChangeInput}
                    placeholder={`${base.enemyScore}` || ""}
                  />
                  <span className={styles.genGameInfoNames}>{base.enemy}</span>
                </div>
                <TableQuarters
                  quarters={base.quarters || []}
                  mode="edit"
                  handleGetQuarters={handleGetQuarters}
                />
              </div>

              <h4 className={styles.popupSubtitle}>
                {t("Players that have played that game")}
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
              </div>
              <h4 className={styles.popupSubtitle}>
                {t("Stats of each player")}
              </h4>
              <div className={styles.popupSection}>
                {Object.values(players)
                  .filter((player) => player.check)
                  .map((player, i) => (
                    <div key={`playerName_${i}`} className={styles.gpsPlayer}>
                      <AddGamePlayerStat
                        player={player}
                        basePlayer={base.playersStats.find(
                          (bPlayer) => bPlayer._id === player._id
                        )}
                        handleChangePlayerStats={handleChangePlayerStats}
                      />
                    </div>
                  ))}
              </div>
              <button className="btn__main">{t("Save")}</button>
            </form>
          </>
        ) : (
          <span className={styles.successMessage}>
            {t("Information about game has been changed successfully!")}
          </span>
        )}
        <div className={styles.closeBtn} onClick={() => closeHandler()}>
          <CloseIcon width="20px" height="20px" color="black" />
        </div>
      </div>
    </div>
  );
}

export default EditGamePopup;
