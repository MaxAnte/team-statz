import React, { useState, useEffect, useContext, useCallback } from "react";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";
import { Game, Player, PlayerStats, Quarter } from "../../context/app.types";
import { AppContext } from "../../context/app.provider";

import AddGamePlayerStat from "../AddGamePlayerStat/addGamePlayerStat";
import TableQuarters from "../TableQuarters/tableQuarters";
import MiniLoader from "../Loader/miniLoader";

import CloseIcon from "../../assets/icons/closeIcon";
import CheckIcon from "../../assets/icons/checkIcon";

import styles from "./addGamePopup.module.css";

import blankPhoto from "../../assets/images/players/blank-silhouette.png";

type Props = {
  closeHandler: () => void;
  base: Partial<Game>;
};

function AddGamePopup({ closeHandler, base }: Props) {
  const { players, completeGame, settings } = useContext(AppContext);
  const [playersList, setPlayersList] = useState<Player[]>(players);
  const [checkListAccept, setCheckListAccept] = useState(false);
  const [form, setForm] = useState<Partial<Game>>({ playersStats: [] });
  const [formClose, setFormClose] = useState<boolean>(false);
  const [playersStatsArr, setPlayersStatsArr] = useState<
    PlayerStats[] | Player[]
  >([]);
  const message = useMessage();
  const { t } = useTranslation();

  const handleCheck = (index: number) => {
    const checkSet = playersList;
    checkSet[index].check = !checkSet[index].check;
    setPlayersList((prevState) => ({ ...prevState, ...checkSet }));
  };

  useEffect(() => {
    setForm((prevState) => ({ ...prevState, ...base }));
    if (players.length) setPlayersStatsArr(players.filter((el) => !!el.check));
  }, [base, players]);

  useEffect(() => {
    gatherGameInfo(Object.values(playersStatsArr));
  }, [playersStatsArr]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: Number(e.target.value),
    }));

  const handleChangePlayerStats = useCallback(
    (playerID: string, playersStats: PlayerStats) => {
      setPlayersStatsArr((prevState) => ({
        ...prevState,
        [playerID]: playersStats,
      }));
    },
    []
  );

  const gatherGameInfo = (gameInfo: PlayerStats[]) =>
    setForm((prevState) => ({
      ...prevState,
      playersStats: gameInfo,
    }));

  const handleGetQuarters = (quarters: Quarter[]) =>
    setForm((prevState) => ({
      ...prevState,
      quarters,
    }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await completeGame(form);
      setFormClose(true);
    } catch (e: any) {
      console.log(e);
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
            <h3 className={styles.popupTitle}>{t("Add Game Stats")}</h3>
            <form className={styles.addGameForm} onSubmit={handleSubmit}>
              <h4 className={styles.popupSubtitle}>
                {t("Set general game information")}
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
                    placeholder="0"
                    className={styles.genGameInfoScore}
                    onChange={handleChangeInput}
                    required
                  />
                  <span>:</span>
                  <input
                    type="text"
                    maxLength={3}
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
                {!Object.values(playersList).length ? (
                  <MiniLoader />
                ) : (
                  <div className={styles.playersSelect}>
                    {Object.values(playersList).map((player, i) => (
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
                {Object.values(playersList).length && !checkListAccept ? (
                  <button
                    className={`btn__main ${styles.playersSelectAccept}`}
                    onClick={() => setCheckListAccept(true)}
                  >
                    {t("Save")}
                  </button>
                ) : null}
              </div>

              {Object.values(playersList).length && !checkListAccept ? (
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
