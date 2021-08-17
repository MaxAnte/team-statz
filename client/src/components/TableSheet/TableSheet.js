import React, { useState, useEffect } from "react";

import styles from "./tableSheet.module.css";

function TableSheet({ player, games }) {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    setStats(
      games.length &&
        games
          .filter((game) => !game.pending)
          .map((game) => game.playersStats.find((pl) => pl._id === player))
          .reduce((acc, cur, index) => ({
            pts: acc.pts + cur.pts,
            oreb: acc.oreb + cur.oreb,
            dreb: acc.dreb + cur.dreb,
            ast: acc.ast + cur.ast,
            stl: acc.stl + cur.stl,
            blk: acc.blk + cur.blk,
            fouls: acc.fouls + cur.fouls,
            tov: acc.tov + cur.tov,
            two_pa: acc.two_pa + cur.two_pa,
            two_pm: acc.two_pm + cur.two_pm,
            three_pa: acc.three_pa + cur.three_pa,
            three_pm: acc.three_pm + cur.three_pm,
            fta: acc.fta + cur.fta,
            ftm: acc.ftm + cur.ftm,
            minutes: acc.minutes + cur.minutes,
            gp: index + 1,
          }))
    );
  }, [games]);

  return (
    <div className={styles.tableWrap}>
      <table>
        <thead>
          <tr>
            <th>SEASON</th>
            <th>GP</th>
            <th>MPG</th>
            <th>PPG</th>
            <th>RPG</th>
            <th>APG</th>
            <th>SPG</th>
            <th>BPG</th>
            <th>TPG</th>
            <th>FGM</th>
            <th>FGA</th>
            <th>FG%</th>
            <th>3PM</th>
            <th>3PA</th>
            <th>3P%</th>
            <th>FTM</th>
            <th>FTA</th>
            <th>FT%</th>
            <th>MIN</th>
            <th>PTS</th>
            <th>REB</th>
            <th>AST</th>
            <th>STL</th>
            <th>BLK</th>
            <th>TOV</th>
            <th>PF</th>
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
