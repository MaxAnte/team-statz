import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";
import { Line, Doughnut } from "react-chartjs-2";

import PlayerCanvas from "../PlayerCanvas/PlayerCanvas";
import TableSheet from "../TableSheet/TableSheet";
import BlockLoader from "../Loader/BlockLoader";

import styles from "./player.module.css";

function Player() {
  const [player, setPlayer] = useState({});
  const [games, setGames] = useState([]);
  const [stats, setStats] = useState([]);
  const { id } = useParams();
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();
  const { t } = useTranslation();

  const getDB = async () => {
    const playerData = await request("/api/player/id", "POST", { _id: id });
    const gamesData = await request("/api/game/games", "POST", {});
    if (gamesData && playerData) {
      setPlayer(playerData);
      setGames(gamesData);
      setStats(
        gamesData.length &&
          gamesData
            .filter((game) => !game.pending)
            .map((game) => game.playersStats.find((pl) => pl._id === id))
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
    }
  };
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    getDB();
  }, []);

  return (
    <div className="player page-wrapper">
      {loading ? (
        <BlockLoader />
      ) : (
        <>
          <div className={styles.top}>
            <img src={player.image_thumb} />
            <div className={styles.info}>
              <h2 className={styles.name}>{player.name}</h2>
              <p className={styles.general}>
                6'6", 216 {t("lbs")} | {player.position}, #{player.number}
              </p>
              <p className={styles.general}>
                <strong>{t("Born")}:</strong> {t("February")} 17, 1963 {t("in")}{" "}
                {t("CityOf", { city: "Brooklyn" })}, NY
              </p>
              <p className={styles.general}>
                <strong>{t("Experience")}:</strong> 15 {t("years")}
              </p>
              <p className={styles.general}>
                <strong>{t("Seasons in team")}:</strong> 5
              </p>
              <ul className={styles.general}>
                <strong>{t("Best totals")}:</strong>

                <li>
                  <strong>{t("Points")}:</strong> 35.5 <span>(2020-2021)</span>
                </li>
                <li>
                  <strong>{t("Rebounds")}:</strong> 7.1 <span>(2018-2019)</span>
                </li>
                <li>
                  <strong>{t("Assists")}:</strong> 10.2 <span>(2015-2016)</span>
                </li>
                <li>
                  <strong>{t("Steals")}:</strong> 1.6 <span>(2016-2017)</span>
                </li>
                <li>
                  <strong>{t("Blocks")}:</strong> 0.2 <span>(2020-2021)</span>
                </li>
              </ul>
            </div>
            <div className={styles.zones}>
              <PlayerCanvas player={player._id} games={games} />
              {/* <div className={styles.seasons}>
              <span>2019</span>
              <span className={styles.activeSeason}>2020</span>
              <span>2021</span>
            </div> */}
            </div>
          </div>
          <div className={styles.main}>
            <h5 className="title text-center">{t("Stats through career")}</h5>
            <TableSheet stats={stats} />
            <div className={styles.graphics}>
              <div className={styles.graphicsOvr}>
                <Line
                  data={{
                    labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
                    datasets: [
                      {
                        label: "Points",
                        data: [stats.pts, 115, 77, 50, 100, 105],
                        fill: false,
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgba(255, 99, 132, 0.2)",
                      },
                      {
                        label: "Rebounds",
                        data: [stats.oreb + stats.dreb, 20, 5, 25, 13, 0],
                        fill: false,
                        backgroundColor: "rgb(203, 99, 255)",
                        borderColor: "rgba(203, 99, 255, 0.2)",
                      },
                      {
                        label: "Assists",
                        data: [stats.ast, 25, 30, 50, 15, 20],
                        fill: false,
                        backgroundColor: "rgb(99, 255, 198)",
                        borderColor: "rgba(99, 255, 198, 0.2)",
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                  }}
                />
              </div>
              <div className={styles.graphicsPerc}>
                <Doughnut
                  data={{
                    labels: ["2PT%", "3PT%", "FT%"],
                    datasets: [
                      {
                        label: "",
                        data: [
                          (stats.two_pm * 100) / stats.two_pa,
                          (stats.three_pm * 100) / stats.three_pa,
                          (stats.ftm * 100) / stats.fta,
                        ],
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 206, 86, 0.2)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </div>
            </div>
            <div className={styles.highlights}>
              <h5 className="title text-center">Hightlights</h5>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Player;
