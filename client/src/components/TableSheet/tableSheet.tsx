import React from "react";
import { useTranslation } from "react-i18next";

import { Player } from "../../app/app.types";

import styles from "./tableSheet.module.css";

type Props = {
  tableStats: Player;
};

function TableSheet({ tableStats }: Props) {
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
            <td>2020</td>
            {tableStats.gp ? (
              <>
                <td>{tableStats.gp}</td>
                <td>{tableStats.mp}</td>
                <td>{tableStats.pts}</td>
                <td>{tableStats.ast}</td>
                <td>{tableStats.reb}</td>
                <td>{tableStats.stl}</td>
                <td>{tableStats.blk}</td>
                <td>{tableStats.tov}</td>
                <td>{tableStats.two_pm + tableStats.three_pm}</td>
                <td>{tableStats.two_pa + tableStats.three_pa}</td>
                <td>
                  {tableStats.two_pa + tableStats.three_pa
                    ? parseFloat(
                        (
                          ((tableStats.two_pm + tableStats.three_pm) * 100) /
                          (tableStats.two_pa + tableStats.three_pa)
                        ).toFixed(1)
                      )
                    : 0}
                  %
                </td>
                <td>{tableStats.three_pm}</td>
                <td>{tableStats.three_pa}</td>
                <td>
                  {tableStats.three_pa
                    ? parseFloat(
                        (
                          (tableStats.three_pm * 100) /
                          tableStats.three_pa
                        ).toFixed(1)
                      )
                    : 0}
                  %
                </td>
                <td>{tableStats.ftm}</td>
                <td>{tableStats.fta}</td>
                <td>
                  {tableStats.fta
                    ? parseFloat(
                        ((tableStats.ftm * 100) / tableStats.fta).toFixed(1)
                      )
                    : 0}
                  %
                </td>
                <td>{tableStats.mp * tableStats.gp}</td>
                <td>{tableStats.pts * tableStats.gp}</td>
                <td>
                  {(
                    (tableStats.oreb + tableStats.dreb) *
                    tableStats.gp
                  ).toString()}
                </td>
                <td>{tableStats.ast * tableStats.gp}</td>
                <td>{tableStats.stl * tableStats.gp}</td>
                <td>{tableStats.blk * tableStats.gp}</td>
                <td>{tableStats.tov * tableStats.gp}</td>
                <td>{tableStats.fouls * tableStats.gp}</td>
                <td>{tableStats.plus_minus}</td>
              </>
            ) : (
              <td colSpan={25} className="text-center">
                {t("The season is about to be started!")}
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableSheet;
