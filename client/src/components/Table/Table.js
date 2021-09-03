import React, { useState, useEffect, useCallback } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";

import MiniLoader from "../Loader/MiniLoader";

import styles from "./table.module.css";

function Table() {
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();
  const { t } = useTranslation();
  const [teams, setTeams] = useState([]);
  const [groups, setGroup] = useState([]);

  const getTeams = useCallback(async () => {
    try {
      const data = await request("/api/team/teams", "POST", {});
      if (Object.keys(data).length) {
        Object.values(data).forEach((el) => {
          el.points = el.wins * 2 + el.loses * 1;
        });
        const readyGroups = [];
        Object.values(data)
          .map((team) => team.group)
          .map((group) => {
            if (!readyGroups.includes(group)) readyGroups.push(group);
          });
        setGroup(readyGroups);
        setTeams(Object.values(data).sort((a, b) => b.points - a.points));
      }
    } catch (e) {
      message(e.message || "Failed to get Table info");
    }
  }, [request]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => getTeams(), [getTeams]);

  return (
    <div className={styles.tables}>
      {groups.map((group) => (
        <div className={styles.tableCont} key={group}>
          {groups.length > 1 ? (
            <span className={styles.groupName}>{t(`Group ${group}`)}</span>
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
              teams
                .filter((el) => el.group === group)
                .map((el, i) => {
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
