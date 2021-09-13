import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";

import BlockLoader from "../Loader/BlockLoader";

import styles from "./stats.module.css";

function Stats() {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [statsTabAverage, setStatsTabAverage] = useState(true);
  const [canvasBound, setCanvasBound] = useState(undefined);
  const [context, setContext] = useState(undefined);
  const [canvas, setCanvas] = useState(null);
  const [filterGame, setFilterGame] = useState(null);
  const [filterPlayer, setFilterPlayer] = useState(null);
  const { t } = useTranslation();

  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();

  const canvasRef = useRef(null);

  const WIDTH = 700;
  const HEIGHT = 750;
  const DPI_WIDTH = WIDTH * 2;
  const DPI_HEIGHT = HEIGHT * 2;
  const MULTIPLIER = 2.41379310345;
  const COLORS = [
    "#FF0032",
    "#F700FF",
    "#8000FF",
    "#469990",
    "#008FFF",
    "#00FF83",
    "#F0FF00",
    "#FFA600",
    "#FF5900",
    "#bfef45",
    "#42d4f4",
    "#ffd8b1",
    "#fffac8",
    "#aaffc3",
    "#ffffff",
  ];
  const POINTER_COLORS =
    players &&
    Array(players.length)
      .fill(0)
      .map((_, i) => {
        return { _id: players[i]._id, color: COLORS[i] };
      });

  const getDB = useCallback(async () => {
    try {
      const gamesData = await request("/api/game/games", "POST", {});
      const playersData = await request("/api/player/players", "POST", {});
      if (Object.keys(gamesData).length)
        setGames(Object.values(gamesData).filter((game) => !game.pending));
      if (Object.keys(playersData).length)
        setPlayers(Object.values(playersData).filter((game) => !game.pending));
    } catch (e) {}
  }, [request]);

  const drawMiss = (ctx, element) => {
    ctx.moveTo(element.x * MULTIPLIER - 12, element.y * MULTIPLIER - 12);
    ctx.lineTo(element.x * MULTIPLIER + 12, element.y * MULTIPLIER + 12);
    ctx.moveTo(element.x * MULTIPLIER + 12, element.y * MULTIPLIER - 12);
    ctx.lineTo(element.x * MULTIPLIER - 12, element.y * MULTIPLIER + 12);
  };
  const drawMade = (ctx, element) =>
    ctx.arc(element.x * MULTIPLIER, element.y * MULTIPLIER, 12, 0, 2 * Math.PI);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => getDB(), [getDB]);

  useEffect(() => {
    const canv = canvasRef.current;
    canv.style.width = WIDTH + "px";
    canv.style.height = HEIGHT + "px";
    canv.width = DPI_WIDTH;
    canv.height = DPI_HEIGHT;
    var ctx = canv.getContext("2d");
    setCanvas(canv);
    setCanvasBound(canv.getBoundingClientRect());
    setContext(ctx);
    let filteredGames = filterGame
      ? games.filter((game) => game.date === filterGame)
      : games;

    filteredGames.forEach((game) =>
      game.playersStats.forEach((player) =>
        player.coordinates.forEach((coord) => {
          ctx.beginPath();
          if (coord.miss) {
            drawMiss(ctx, coord);
          } else {
            drawMade(ctx, coord);
          }
          filterPlayer === player._id
            ? (ctx.lineWidth = 9)
            : (ctx.lineWidth = 7);
          ctx.closePath();
          if (players.length) {
            filterPlayer
              ? player._id === filterPlayer
                ? (ctx.strokeStyle = POINTER_COLORS.find(
                    (el) => el._id === player._id
                  ).color)
                : (ctx.strokeStyle = `${
                    POINTER_COLORS.find((el) => el._id === player._id).color
                  }33`)
              : (ctx.strokeStyle = POINTER_COLORS.find(
                  (el) => el._id === player._id
                ).color);
          } else {
            ctx.strokeStyle = "#c1c1c1";
          }
          ctx.stroke();
        })
      )
    );
  }, [players, games, filterGame, filterPlayer]);

  const countOverallStats = () => {
    let pts = 0;
    let reb = 0;
    let ast = 0;
    let stl = 0;
    let blk = 0;
    let fga = 0;
    let fgm = 0;
    let fgp = 0;
    let two_fga = 0;
    let two_fgm = 0;
    let two_fgp = 0;
    let three_fga = 0;
    let three_fgm = 0;
    let three_fgp = 0;
    let fta = 0;
    let ftm = 0;
    let ftp = 0;
    let fouls = 0;
    let tovs = 0;
    let plus_minus = 0;
    let gPlayed = 0;
    games.length &&
      games.forEach((game, i) => {
        if (filterPlayer) {
          if (
            game.playersStats.filter((player) => player._id === filterPlayer)
              .length
          ) {
            gPlayed++;
            game.playersStats
              .filter((player) => player._id === filterPlayer)
              .forEach((stats) => {
                pts += stats.pts;
                reb += stats.oreb + stats.dreb;
                ast += stats.ast;
                stl += stats.stl;
                blk += stats.blk;
                tovs += stats.tov;
                fouls += stats.fouls;
                plus_minus += stats.plus_minus;
                two_fga += stats.two_pa;
                two_fgm += stats.two_pm;
                three_fga += stats.three_pa;
                three_fgm += stats.three_pm;
                fta += stats.fta;
                ftm += stats.ftm;
              });
          }
        } else {
          game.playersStats.forEach((player) => {
            pts += player.pts;
            reb += player.oreb + player.dreb;
            ast += player.ast;
            stl += player.stl;
            blk += player.blk;
            tovs += player.tov;
            fouls += player.fouls;
            plus_minus += player.plus_minus;
            two_fga += player.two_pa;
            two_fgm += player.two_pm;
            three_fga += player.three_pa;
            three_fgm += player.three_pm;
            fta += player.fta;
            ftm += player.ftm;
          });
        }
        if (i === games.length - 1) {
          two_fgp += two_fga ? (two_fgm * 100) / two_fga : 0;
          three_fgp += three_fga ? (three_fgm * 100) / three_fga : 0;
          ftp += fta ? (ftm * 100) / fta : 0;
          fga = two_fga + three_fga;
          fgm = two_fgm + three_fgm;
          fgp = fga ? (fgm * 100) / fga : 0;
        }
      });
    return countStatsMarkup(
      pts,
      reb,
      ast,
      stl,
      blk,
      tovs,
      fouls,
      plus_minus,
      two_fga,
      two_fgm,
      two_fgp,
      three_fga,
      three_fgm,
      three_fgp,
      fta,
      ftm,
      ftp,
      fga,
      fgm,
      fgp,
      gPlayed
    );
  };

  const countGameStats = (gameDate) => {
    let pts = 0;
    let reb = 0;
    let ast = 0;
    let stl = 0;
    let blk = 0;
    let fga = 0;
    let fgm = 0;
    let fgp = 0;
    let two_fga = 0;
    let two_fgm = 0;
    let two_fgp = 0;
    let three_fga = 0;
    let three_fgm = 0;
    let three_fgp = 0;
    let fta = 0;
    let ftm = 0;
    let ftp = 0;
    let fouls = 0;
    let tovs = 0;
    let plus_minus = 0;
    games.length &&
      games
        .filter((game) => game.date === gameDate)[0]
        .playersStats.forEach((player, i) => {
          if (filterPlayer) {
            if (filterPlayer === player._id) {
              pts += player.pts;
              reb += player.oreb + player.dreb;
              ast += player.ast;
              stl += player.stl;
              blk += player.blk;
              tovs += player.tov;
              fouls += player.fouls;
              plus_minus += player.plus_minus;
              two_fga += player.two_pa;
              two_fgm += player.two_pm;
              two_fgp += two_fga ? (two_fgm * 100) / two_fga : 0;
              three_fga += player.three_pa;
              three_fgm += player.three_pm;
              three_fgp += three_fga ? (three_fgm * 100) / three_fga : 0;
              fta += player.fta;
              ftm += player.ftm;
              ftp += fta ? (ftm * 100) / fta : 0;
              fga += two_fga + three_fga;
              fgm += two_fgm + three_fgm;
              fgp += fga ? (fgm * 100) / fga : 0;
            }
          } else {
            pts += player.pts;
            reb += player.oreb + player.dreb;
            ast += player.ast;
            stl += player.stl;
            blk += player.blk;
            tovs += player.tov;
            fouls += player.fouls;
            plus_minus += player.plus_minus;
            two_fga += player.two_pa;
            two_fgm += player.two_pm;
            three_fga += player.three_pa;
            three_fgm += player.three_pm;
            fta += player.fta;
            ftm += player.ftm;
            if (
              i ===
              games.filter((game) => game.date === gameDate)[0].playersStats
                .length -
                1
            ) {
              two_fgp += two_fga ? (two_fgm * 100) / two_fga : 0;
              three_fgp += three_fga ? (three_fgm * 100) / three_fga : 0;
              ftp += fta ? (ftm * 100) / fta : 0;
              fga += two_fga + three_fga;
              fgm += two_fgm + three_fgm;
              fgp += fga ? (fgm * 100) / fga : 0;
            }
          }
        });
    return countStatsMarkup(
      pts,
      reb,
      ast,
      stl,
      blk,
      tovs,
      fouls,
      plus_minus,
      two_fga,
      two_fgm,
      two_fgp,
      three_fga,
      three_fgm,
      three_fgp,
      fta,
      ftm,
      ftp,
      fga,
      fgm,
      fgp
    );
  };

  const countStatsMarkup = (
    pts,
    reb,
    ast,
    stl,
    blk,
    tovs,
    fouls,
    plus_minus,
    two_fga,
    two_fgm,
    two_fgp,
    three_fga,
    three_fgm,
    three_fgp,
    fta,
    ftm,
    ftp,
    fga,
    fgm,
    fgp,
    gPlayed = 0
  ) => {
    if (!gPlayed) gPlayed = games.length;
    return (
      <div className={styles.statsColumnRowsInfo}>
        {!filterGame ? (
          <div className={styles.allGamesStatsTabs}>
            <button
              onClick={() => setStatsTabAverage(true)}
              className={`${statsTabAverage ? styles.activeTab : ""}`}
            >
              {t("Average")}
            </button>
            <button
              onClick={() => setStatsTabAverage(false)}
              className={`${!statsTabAverage ? styles.activeTab : ""}`}
            >
              {t("Overall")}
            </button>
          </div>
        ) : null}
        <div className={styles.statsColumnRowsItem}>
          <span>
            {t("Pts")}:{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((pts / gPlayed).toFixed(1))
                : 0
              : parseFloat(pts.toFixed(1))}
          </span>
        </div>
        <div className={styles.statsColumnRowsItem}>
          <span>
            {t("2PA")}:{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((two_fga / gPlayed).toFixed(1))
                : 0
              : parseFloat(two_fga.toFixed(1))}
          </span>
          <span>
            {t("2PM")}:{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((two_fgm / gPlayed).toFixed(1))
                : 0
              : parseFloat(two_fgm.toFixed(1))}
          </span>
          <span>
            {t("2P")}%: {parseFloat(two_fgp.toFixed(1))}
          </span>
        </div>
        <div className={styles.statsColumnRowsItem}>
          <span>
            {t("3PA")}:{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((three_fga / gPlayed).toFixed(1))
                : 0
              : parseFloat(three_fga.toFixed(1))}
          </span>
          <span>
            {t("3PM")}:{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((three_fgm / gPlayed).toFixed(1))
                : 0
              : parseFloat(three_fgm.toFixed(1))}
          </span>
          <span>
            {t("3P")}%: {parseFloat(three_fgp.toFixed(1))}
          </span>
        </div>
        <div className={styles.statsColumnRowsItem}>
          <span>
            {t("FTA")}:{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((fta / gPlayed).toFixed(1))
                : 0
              : parseFloat(fta.toFixed(1))}
          </span>
          <span>
            {t("FTM")}:{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((ftm / gPlayed).toFixed(1))
                : 0
              : parseFloat(ftm.toFixed(1))}
          </span>
          <span>FT%: {parseFloat(ftp.toFixed(1))}</span>
        </div>
        <div className={styles.statsColumnRowsItem}>
          <span>
            {t("FGA")}:{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((fga / gPlayed).toFixed(1))
                : 0
              : parseFloat(fga.toFixed(1))}
          </span>
          <span>
            {t("FGM")}:{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((fgm / gPlayed).toFixed(1))
                : 0
              : parseFloat(fgm.toFixed(1))}
          </span>
          <span>FG%: {parseFloat(fgp.toFixed(1))}</span>
        </div>
        <div className={styles.statsColumnRowsItem}>
          <span>
            {t("Reb")}:{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((reb / gPlayed).toFixed(1))
                : 0
              : parseFloat(reb.toFixed(1))}
          </span>
          <span>
            {t("Ast")}:{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((ast / gPlayed).toFixed(1))
                : 0
              : parseFloat(ast.toFixed(1))}
          </span>
          <span>
            {t("Stl")}:{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((stl / gPlayed).toFixed(1))
                : 0
              : parseFloat(stl.toFixed(1))}
          </span>
          <span>
            {t("Blk")}:{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((blk / gPlayed).toFixed(1))
                : 0
              : parseFloat(blk.toFixed(1))}
          </span>
          <span>
            {t("Tov")}:{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((tovs / gPlayed).toFixed(1))
                : 0
              : parseFloat(tovs.toFixed(1))}
          </span>
          <span>
            {t("Fouls")}:{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((fouls / gPlayed).toFixed(1))
                : 0
              : parseFloat(fouls.toFixed(1))}
          </span>
          <span>
            {"+/-"} :{" "}
            {statsTabAverage && !filterGame
              ? gPlayed
                ? parseFloat((plus_minus / gPlayed).toFixed(1))
                : 0
              : parseFloat(plus_minus.toFixed(1))}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="stats page-wrapper">
      <h2 className="title">{t("Stats")}</h2>
      <div className={styles.statsTop}>
        <div className={styles.statsColumn}>
          <h5>{t("Players")}</h5>
          <div className={styles.statsColumnRows}>
            {!loading ? (
              players.map((player, i) => (
                <div className={styles.statsColumnRowsPlayersItem} key={i}>
                  <span
                    className={styles.playerColorStick}
                    style={{
                      backgroundColor: POINTER_COLORS[i].color,
                    }}
                  ></span>
                  <span
                    className={
                      filterPlayer === player._id
                        ? styles.activePlayerFilter
                        : ""
                    }
                    onClick={() =>
                      setFilterPlayer(
                        filterPlayer === player._id ? null : player._id
                      )
                    }
                  >
                    {player.name}, {player.position}
                  </span>
                </div>
              ))
            ) : (
              <BlockLoader />
            )}
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className={styles.canvasStats}
          id="canvasStats"
        />
        <div className={styles.statsColumn}>
          <h5>{t("Game stats")}</h5>
          {!loading ? (
            filterGame ? (
              countGameStats(filterGame)
            ) : (
              countOverallStats()
            )
          ) : (
            <BlockLoader />
          )}
        </div>
      </div>
      <div className={`${styles.statsWrap} ${loading ? styles.loading : ""}`}>
        <h3 className="title">{t("Games")}</h3>
        {!loading ? (
          <div className={styles.gamesWrap}>
            {games.length ? (
              games.map((game, i) => (
                <div
                  className={`${styles.gameCard} ${
                    filterGame === game.date ? styles.activeCard : ""
                  }`}
                  onClick={() =>
                    setFilterGame(filterGame === game.date ? null : game.date)
                  }
                  key={i}
                >
                  <h4 className={styles.calendarGameName}>
                    {t("vs.")} {game.enemy}
                  </h4>
                  <div className={styles.calendarGameScore}>
                    <span
                      className={`our ${
                        game.ourScore > game.enemyScore
                          ? styles.win
                          : styles.lose
                      }`}
                    >
                      {game.ourScore}
                    </span>
                    :<span>{game.enemyScore}</span>
                  </div>
                  <span>{game.date}</span>
                </div>
              ))
            ) : (
              <div className={styles.noGames}>
                {t("So far no games have been played")}. {t("Go to")}{" "}
                <Link to="/schedule">
                  <strong>{t("Schedule")}</strong>
                </Link>{" "}
                {t("and add Game!")}
              </div>
            )}
          </div>
        ) : (
          <BlockLoader />
        )}
      </div>
    </div>
  );
}

export default Stats;
