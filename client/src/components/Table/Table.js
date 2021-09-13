import React, { useState, useEffect, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../context/app.provider";
import { SessionContext } from "../../context/session.provider";
import { useOutsideClickHandler } from "../../hooks/outsideClick.hook";

import MiniLoader from "../Loader/MiniLoader";

import styles from "./table.module.css";

function Table() {
  const { isAuthenticated } = useContext(SessionContext);
  const {
    settings: { playoffsBracketBuilt },
    getTeams,
    editTeamInfo,
    teams,
    loading,
  } = useContext(AppContext);
  const { t } = useTranslation();
  const [table, setTable] = useState([]);
  const [editableTeam, setEditableTeam] = useState(undefined);
  const editableCellRef = useRef(null);
  const closeEditableCell = useOutsideClickHandler(editableCellRef);

  useEffect(() => getTeams(), []);
  useEffect(() => setTable(sortTableStandings(Object.values(teams))), [teams]);

  useEffect(() => {
    if (isAuthenticated && closeEditableCell) {
      editTeamInfo(editableTeam);
      setEditableTeam(undefined);
    }
  }, [closeEditableCell]);

  const sortTableStandings = (standings) => {
    const splitedByGroups = {};
    standings
      .sort((a, b) => b.points - a.points || b.winRate - a.winRate)
      .forEach((team) => {
        if (splitedByGroups[team.group]) {
          splitedByGroups[team.group].push(team);
        } else {
          splitedByGroups[team.group] = [team];
        }
      });
    return Object.entries(splitedByGroups);
  };

  const handleEditRow = (e) => {
    setEditableTeam((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={styles.tables}>
      {table.map((group) => (
        <div className={styles.tableCont} key={group}>
          {table.length > 1 ? (
            <span className={styles.groupName}>{t(`Group ${group[0]}`)}</span>
          ) : null}
          <div className={styles.tableWrap}>
            <div className={styles.tableHead}>
              <span className={styles.tableRowPos}>№</span>
              <p className={styles.tableRowName}>{t("Team")}</p>
              <span className={styles.tableRowWins}>{t("W")}</span>
              <span className={styles.tableRowLoses}>{t("L")}</span>
              <span className={styles.tableRowPoints}>{t("Pts")}</span>
            </div>
            {loading ? (
              <MiniLoader />
            ) : (
              group[1].map((el, i) => {
                return isAuthenticated && editableTeam?._id === el._id ? (
                  <div
                    ref={editableCellRef}
                    className={`${styles.tableRow} ${
                      playoffsBracketBuilt
                        ? i <= 3
                          ? styles.clinched
                          : styles.eliminated
                        : ""
                    }`}
                    key={`tableRow${i}`}
                    onClick={() => setEditableTeam(el)}
                  >
                    <span className={styles.tableRowPos}>{++i}</span>
                    <p className={styles.tableRowName}>{el.name}</p>
                    <span className={styles.tableRowWins}>
                      {editableTeam?._id === el._id ? (
                        <input
                          type="number"
                          min="0"
                          className={styles.editableCell}
                          placeholder={el.wins}
                          name="wins"
                          value={editableTeam.wins}
                          onChange={handleEditRow}
                        />
                      ) : (
                        el.wins
                      )}
                    </span>
                    <span className={styles.tableRowLoses}>
                      {editableTeam?._id === el._id ? (
                        <input
                          type="number"
                          min="0"
                          className={styles.editableCell}
                          placeholder={el.loses}
                          name="loses"
                          value={editableTeam.loses}
                          onChange={handleEditRow}
                        />
                      ) : (
                        el.loses
                      )}
                    </span>
                    <span className={styles.tableRowPoints}>{el.points}</span>
                  </div>
                ) : (
                  <div
                    className={`${styles.tableRow} ${
                      playoffsBracketBuilt
                        ? i <= 3
                          ? styles.clinched
                          : styles.eliminated
                        : ""
                    }`}
                    key={`tableRow${i}`}
                    onClick={() => setEditableTeam(el)}
                  >
                    <span className={styles.tableRowPos}>{++i}</span>
                    <p className={styles.tableRowName}>{el.name}</p>
                    <span className={styles.tableRowWins}>{el.wins}</span>
                    <span className={styles.tableRowLoses}>{el.loses}</span>
                    <span className={styles.tableRowPoints}>{el.points}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Table;
