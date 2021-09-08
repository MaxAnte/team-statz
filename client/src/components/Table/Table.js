import React, { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";

import MiniLoader from "../Loader/MiniLoader";

import styles from "./table.module.css";

function Table() {
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();
  const { t } = useTranslation();
  const [table, setTable] = useState([]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    (async () => {
      try {
        const data = await request("/api/team/teams", "POST", {});
        if (Object.keys(data).length) {
          Object.values(data).forEach((el) => {
            el.winRate = (el.wins * 100) / (el.wins + el.loses);
            el.points = el.wins * 2 + el.loses * 1;
          });
          setTable(sortTableStandings(Object.values(data)));
        }
      } catch (e) {
        message(e.message || "Failed to get Table info");
      }
    })();
  }, [request, message]);

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
        </div>
      ))}
    </div>
  );
}

export default Table;
