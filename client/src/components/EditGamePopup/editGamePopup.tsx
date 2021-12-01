import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Game, Player, PlayerStats, Quarter } from "../../app/app.types";

import { useMessage } from "../../hooks/message.hook";

import { AppContext } from "../../app/app.provider";

import AddGamePlayerStat from "../AddGamePlayerStat/addGamePlayerStat";
import MiniLoader from "../Loader/miniLoader";
import TableQuarters from "../TableQuarters/tableQuarters";

import CheckIcon from "../../assets/icons/checkIcon";
import CloseIcon from "../../assets/icons/closeIcon";

import blankPhoto from "../../assets/images/players/blank-silhouette.png";

import styles from "./EditGamePopup.module.css";

type Props = {
  closeHandler: () => void;
  base: Game;
};

function EditGamePopup({ closeHandler, base }: Props) {
  const { players, editGame, settings } = useContext(AppContext);
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

  useEffect(() => {
    setForm((prevState) => ({ ...prevState, ...base }));
    const mPlayers = players;
    mPlayers.map((player: Player) => {
      base.playersStats.forEach((p) => {
        if (player._id === p._id) {
          player.check = true;
        }
      });
      return player;
    });
    setPlayersList(mPlayers);
  }, [base, players]);

  const handleChangePlayerStats = useCallback(
    (playerID: string, playersStats: PlayerStats) => {
      setPlayersStatsArr((prevState) => ({
        ...prevState,
        [playerID]: playersStats,
      }));
    },
    []
  );

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
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: Number(e.target.value),
    }));

  const handleGetQuarters = (quarters: Quarter[]) =>
    setForm((prevState) => ({
      ...prevState,
      quarters,
    }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await editGame(form);
      setFormClose(true);
    } catch (error: any) {
      message(error.message || t("Something is missing..."));
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
                  <span className={styles.genGameInfoNames}>
                    {settings.teamName || "Your team"}
                  </span>
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
                  quarters={base.quarters}
                  gameId={base._id}
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
                    {Object.values(playersList).map((player, i) => (
                      <div
                        key={`edit-${base.date}-${base.time}-${player.name}`}
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
                          <div className={styles.disabler} />
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
                  .map((player) => (
                    <div
                      key={`edit-${base.date}-${base.time}-${player.name}-stats`}
                      className={styles.gpsPlayer}
                    >
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
              <button type="submit" className="btn__main">
                {t("Save")}
              </button>
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
