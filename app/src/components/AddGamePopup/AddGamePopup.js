import React, { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";

import Select from "../Select/select";
import AddGamePlayerStat from "../AddGamePlayerStat/AddGamePlayerStat";

import CloseIcon from "../../assets/icons/CloseIcon";
import CheckIcon from "../../assets/icons/CheckIcon";

import styles from "./addGamePopup.module.css";

import blankPhoto from "../../assets/images/players/blank-silhouette.png";

function AddGamePopup({ closeHandler }) {
  const [players, setPlayers] = useState([]);
  const [checkListAccept, setCheckListAccept] = useState(false);
  const [teams, setTeams] = useState(undefined);
  const [form, setForm] = useState({ playersStats: [] });
  const [formClose, setFormClose] = useState(false);
  const [playersStatsArr, setPlayersStatsArr] = useState([]);

  const { request } = useHttp();

  const handleCheck = (index) => {
    const checkSet = players;
    checkSet[index].check = !checkSet[index].check;
    setPlayers((prevState) => ({ ...prevState, ...checkSet }));
  };

  const getTeams = async () => {
    try {
      const data = await request("/api/team/teams", "POST", {});
      if (data) setTeams(Object.values(data));
    } catch (e) {}
  };

  const getPlayers = async () => {
    try {
      const data = await request("/api/player/players", "POST", {});
      if (data) setPlayers(Object.values(data));
    } catch (e) {}
  };

  const teamList = teams ? teams.map((team) => team.name) : [];
  Object.values(players).map((player) => {
    return {
      name: player.name,
      position: player.position,
      check: false,
    };
  });

  useEffect(() => {
    getTeams();
    getPlayers();
    if (players && typeof players === "array")
      setPlayersStatsArr(players.filter((el) => !!el.check));
  }, []);

  const handleGetActive = (enemy) =>
    setForm((prevState) => ({ ...prevState, enemy }));

  const handleChangeInput = (e) =>
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const handleChangePlayerStats = (playerID, playersStats) => {
    setPlayersStatsArr((prevState) => ({
      ...prevState,
      [playerID]: playersStats,
    }));
    gatherGameInfo(Object.values(playersStatsArr));
  };

  const gatherGameInfo = (gameInfo) =>
    setForm((prevState) => ({
      ...prevState,
      playersStats: gameInfo,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await request("/api/game/add-game", "POST", { ...form });
    setFormClose(true);
  };

  const handleChangeDate = (e) =>
    setForm((prevState) => ({ ...prevState, date: e.target.value }));
  const handleChangeTime = (e) =>
    setForm((prevState) => ({ ...prevState, time: e.target.value }));

  return (
    <div className={styles.popupWrap}>
      <div
        className={`${styles.popupContainer} ${
          formClose ? styles.centerAlign : ""
        }`}
      >
        {!formClose ? (
          <>
            <h3 className={styles.popupTitle}>Add Game Stats</h3>
            <form className={styles.addGameForm} onSubmit={handleSubmit}>
              <h4 className={styles.popupSubtitle}>
                Set general game information
              </h4>
              <div className={styles.popupSection}>
                <div className={styles.genGameInfo}>
                  <span className={styles.genGameInfoNames}>
                    Basketball City
                  </span>
                  <input
                    type="text"
                    maxLength="3"
                    name="ourScore"
                    id="ourScore"
                    className={styles.genGameInfoScore}
                    onChange={handleChangeInput}
                  />
                  <span>:</span>
                  <input
                    type="text"
                    maxLength="3"
                    name="enemyScore"
                    id="enemyScore"
                    className={styles.genGameInfoScore}
                    onChange={handleChangeInput}
                  />
                  <Select
                    options={teamList ? teamList : []}
                    className={styles.genGameInfoNames}
                    getActive={handleGetActive}
                  />
                </div>
                <div className={styles.date}>
                  <input type="date" name="date" onChange={handleChangeDate} />
                  <input
                    type="text"
                    name="time"
                    placeholder="18:00"
                    onChange={handleChangeTime}
                  />
                </div>
              </div>

              <h4 className={styles.popupSubtitle}>
                Check players that have played that game
              </h4>
              <div className={styles.popupSection}>
                <div className={styles.playersSelect}>
                  {Object.values(players).map((player, i) => (
                    <div
                      key={`playerName_${i}`}
                      className={styles.playerCard}
                      onClick={() => handleCheck(i)}
                    >
                      <img src={blankPhoto} alt="" />
                      <span>
                        {player.name}, {player.position}
                      </span>
                      <div
                        className={`${styles.playerCheck} ${
                          player.check ? styles.playerCheckActive : ""
                        }`}
                      >
                        <CheckIcon width="14px" heigth="14px" color="green" />
                      </div>
                      {!player.check ? (
                        <div className={styles.disabler}></div>
                      ) : null}
                    </div>
                  ))}
                </div>

                {!checkListAccept ? (
                  <button
                    className={`btn__main ${styles.playersSelectAccept}`}
                    onClick={() => setCheckListAccept(true)}
                  >
                    Save
                  </button>
                ) : null}
              </div>

              {!checkListAccept ? <span>Check players above</span> : null}
              {checkListAccept ? (
                <>
                  <h4 className={styles.popupSubtitle}>
                    Add stats to each player
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
                  <button className="btn__main">Save game info</button>
                </>
              ) : null}
            </form>
          </>
        ) : (
          <span className={styles.successMessage}>
            Information about game has been added successfully!
          </span>
        )}
        <div className={styles.closeBtn} onClick={() => closeHandler()}>
          <CloseIcon width="20px" heigth="20px" color="black" />
        </div>
      </div>
    </div>
  );
}

export default AddGamePopup;
