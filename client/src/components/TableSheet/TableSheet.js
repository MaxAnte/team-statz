import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./tableSheet.module.css";

function TableSheet({ stats }) {
  const { t } = useTranslation();
  return (
    <div className={styles.tableWrap}>
      <table>
        <thead>
          <tr>
            <th>{t("SEASON")}</th>
            <th>{t("GP")}</th>
            <th>{t("MPG")}</th>
            <th>{t("PPG")}</th>
            <th>{t("APG")}</th>
            <th>{t("RPG")}</th>
            <th>{t("SPG")}</th>
            <th>{t("BPG")}</th>
            <th>{t("TPG")}</th>
            <th>{t("FGM")}</th>
            <th>{t("FGA")}</th>
            <th>{t("FG%")}</th>
            <th>{t("3PM")}</th>
            <th>{t("3PA")}</th>
            <th>{t("3P%")}</th>
            <th>{t("FTM")}</th>
            <th>{t("FTA")}</th>
            <th>{t("FT%")}</th>
            <th>{t("MIN")}</th>
            <th>{t("PTS")}</th>
            <th>{t("REB")}</th>
            <th>{t("AST")}</th>
            <th>{t("STL")}</th>
            <th>{t("BLK")}</th>
            <th>{t("TOV")}</th>
            <th>{t("PF")}</th>
            <th>+/-</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>2020</th>
            <th>{stats.gp}</th>
            <th>
              {stats.gp ? parseFloat((stats.minutes / stats.gp).toFixed(1)) : 0}
            </th>
            <th>
              {stats.gp ? parseFloat((stats.pts / stats.gp).toFixed(1)) : 0}
            </th>
            <th>
              {stats.gp
                ? parseFloat(((stats.oreb + stats.dreb) / stats.gp).toFixed(1))
                : 0}
            </th>
            <th>
              {stats.gp ? parseFloat((stats.ast / stats.gp).toFixed(1)) : 0}
            </th>
            <th>
              {stats.gp ? parseFloat((stats.stl / stats.gp).toFixed(1)) : 0}
            </th>
            <th>
              {stats.gp ? parseFloat((stats.blk / stats.gp).toFixed(1)) : 0}
            </th>
            <th>
              {stats.gp ? parseFloat((stats.tov / stats.gp).toFixed(1)) : 0}
            </th>
            <th>
              {stats.gp
                ? parseFloat(
                    ((stats.two_pm + stats.three_pm) / stats.gp).toFixed(1)
                  )
                : 0}
            </th>
            <th>
              {stats.gp
                ? parseFloat(
                    ((stats.two_pa + stats.three_pa) / stats.gp).toFixed(1)
                  )
                : 0}
            </th>
            <th>
              {stats.two_pa + stats.three_pa
                ? parseFloat(
                    (
                      ((stats.two_pm + stats.three_pm) * 100) /
                      (stats.two_pa + stats.three_pa)
                    ).toFixed(1)
                  )
                : 0}
              %
            </th>
            <th>
              {stats.gp
                ? parseFloat((stats.three_pm / stats.gp).toFixed(1))
                : 0}
            </th>
            <th>
              {stats.gp
                ? parseFloat((stats.three_pa / stats.gp).toFixed(1))
                : 0}
            </th>
            <th>
              {stats.three_pa
                ? parseFloat(
                    ((stats.three_pm * 100) / stats.three_pa).toFixed(1)
                  )
                : 0}
              %
            </th>
            <th>
              {stats.gp ? parseFloat((stats.ftm / stats.gp).toFixed(1)) : 0}
            </th>
            <th>
              {stats.gp ? parseFloat((stats.fta / stats.gp).toFixed(1)) : 0}
            </th>
            <th>
              {stats.fta
                ? parseFloat(((stats.ftm * 100) / stats.fta).toFixed(1))
                : 0}
              %
            </th>
            <th>{stats.minutes}</th>
            <th>{stats.pts}</th>
            <th>{stats.oreb + stats.dreb}</th>
            <th>{stats.ast}</th>
            <th>{stats.stl}</th>
            <th>{stats.blk}</th>
            <th>{stats.tov}</th>
            <th>{stats.fouls}</th>
            <th>?</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableSheet;
