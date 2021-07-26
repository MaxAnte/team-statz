import React, { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useTranslation } from "react-i18next";

import MiniLoader from "../Loader/MiniLoader";

import styles from "./table.module.css";

function Table() {
  const [teams, setTeams] = useState(undefined);
  const { loading, request } = useHttp();
  const { t } = useTranslation();

  const getTeams = async () => {
    try {
      const data = await request("/api/team/teams", "POST", {});
      if (data) setTeams(data);
    } catch (e) {}
  };

  useEffect(() => {
    getTeams();
  }, []);
  const teamList = teams ? Object.values(teams) : [];

  if (teamList) {
    teamList.forEach((el) => {
      el.winRate = (el.wins * 100) / (el.wins + el.loses);
      el.points = el.wins * 2 + el.loses * 1;
    });
    teamList.sort((a, b) => b.points - a.points);
  }

  return (
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
        teamList &&
        teamList.map((el, i) => {
          return (
            <div className={styles.tableRow} key={`tableRow${i}`}>
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
  );
}

export default Table;
