import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Team } from "../../context/app.types";

import { useOutsideClickHandler } from "../../hooks/outsideClick.hook";

import { AppContext } from "../../context/app.provider";
import { SessionContext } from "../../context/session.provider";

import MiniLoader from "../Loader/miniLoader";

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
  const [table, setTable]: any[] = useState([]);
  const [editableTeam, setEditableTeam] = useState<Team | undefined>(undefined);
  const editableCellRef = useRef(null);
  const closeEditableCell = useOutsideClickHandler(editableCellRef);

  useEffect(() => {
    getTeams();
  }, [getTeams]);

  useEffect(() => {
    setTable(sortTableStandings(teams));
  }, [teams]);

  useEffect(() => {
    if (isAuthenticated && closeEditableCell && editableTeam) {
      editTeamInfo(editableTeam);
      setEditableTeam(undefined);
    }
  }, [closeEditableCell, editTeamInfo, editableTeam, isAuthenticated]);

  const sortTableStandings = (standings: Team[]) => {
    const splitedByGroups: any = {};
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

  const handleEditRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableTeam((prev) => {
      if (prev) return { ...prev, [e.target.name]: Number(e.target.value) };
      return prev;
    });
  };

  return (
    <div className={styles.tables}>
      {table.map((group: any[]) => (
        <div className={styles.tableCont} key={group[0]}>
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
              group[1].map((el: Team, i: number) =>
                isAuthenticated && editableTeam?._id === el._id ? (
                  <div
                    ref={editableCellRef}
                    className={`${styles.tableRow} ${
                      playoffsBracketBuilt
                        ? i <= 3
                          ? styles.clinched
                          : styles.eliminated
                        : ""
                    }`}
                    key={`tableRow${el.name}`}
                    onClick={() => setEditableTeam(el)}
                  >
                    <span className={styles.tableRowPos}>{i + 1}</span>
                    <p className={styles.tableRowName}>{el.name}</p>
                    <span className={styles.tableRowWins}>
                      {editableTeam?._id === el._id ? (
                        <input
                          type="number"
                          min="0"
                          className={styles.editableCell}
                          placeholder={`${el.wins}`}
                          name="wins"
                          value={editableTeam?.wins}
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
                          placeholder={`${el.loses}`}
                          name="loses"
                          value={editableTeam?.loses}
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
                    key={`tableRow${el.name}`}
                    onClick={() => setEditableTeam(el)}
                  >
                    <span className={styles.tableRowPos}>{i + 1}</span>
                    <p className={styles.tableRowName}>{el.name}</p>
                    <span className={styles.tableRowWins}>{el.wins}</span>
                    <span className={styles.tableRowLoses}>{el.loses}</span>
                    <span className={styles.tableRowPoints}>{el.points}</span>
                  </div>
                )
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Table;
