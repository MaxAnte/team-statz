import React, { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";

import Select from "../Select/select";
import AddGamePlayerStat from "../AddGamePlayerStat/AddGamePlayerStat";

import CloseIcon from "../../assets/icons/CloseIcon";
import CheckIcon from "../../assets/icons/CheckIcon";

import styles from "./addGamePopup.module.css";

import blankPhoto from "../../assets/images/players/blank-silhouette.png";

function AddGamePopup({ closeHandler }) {
  const [playersCheck, setPlayersCheck] = useState(Array(11).fill(false));
  const [checkListAccept, setCheckListAccept] = useState(false);
  const [teams, setTeams] = useState(undefined);
  const [form, setForm] = useState({ playersStats: [] });
  const [formClose, setFormClose] = useState(false);
  const [playersStatsArr, setPlayersStatsArr] = useState(
    playersCheck.filter((el) => !!el)
  );

  const { request } = useHttp();

  const handleCheck = (index) => {
    const newCheckSet = playersCheck;
    newCheckSet[index] = !newCheckSet[index];
    setPlayersCheck([...playersCheck]);
  };

  const getTeams = async () => {
    try {
      const data = await request("/api/team/teams", "POST", {});
      if (data) setTeams(data);
    } catch (e) {}
  };

  useEffect(() => {
    getTeams();
  }, []);

  const teamList = teams ? Object.values(teams).map((team) => team.name) : [];

  const handleGetActive = (enemy) => {
    setForm((prevState) => ({ ...prevState, enemy }));
  };

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
    const data = await request("/api/game/add-game", "POST", { ...form });
    console.log(data);
    setFormClose(true);
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
              </div>

              <h4 className={styles.popupSubtitle}>
                Check players that have played that game
              </h4>
              <div className={styles.popupSection}>
                <div className={styles.playersSelect}>
                  {playersCheck.map((_, i) => (
                    <div
                      key={`playerName_${i}`}
                      className={styles.playerCard}
                      onClick={() => handleCheck(i)}
                    >
                      <img src={blankPhoto} alt="" />
                      <span>Player Name, Position</span>
                      <div
                        className={`${styles.playerCheck} ${
                          playersCheck[i] ? styles.playerCheckActive : ""
                        }`}
                      >
                        <CheckIcon width="14px" heigth="14px" color="green" />
                      </div>
                      {!playersCheck[i] ? (
                        <div className={styles.disabler}></div>
                      ) : null}
                    </div>
                  ))}
                </div>

                {!checkListAccept ? (
                  <button
                    className={`btn__main ${styles.playersSelectAccept}`}
                    onClick={() => setCheckListAccept(true)}
                    disabled={!playersCheck.includes(true)}
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
                    {playersCheck
                      .filter((el) => el)
                      .map((_, i) => (
                        <div
                          key={`playerName_${i}`}
                          className={styles.gpsPlayer}
                        >
                          <AddGamePlayerStat
                            playerID={i}
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
