/* eslint-disable complexity, react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  COLORS_STATS as COLORS,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  drawCourt,
  drawMade,
  drawMiss,
  MULTIPLIER_STATS as MULTIPLIER,
} from "../../helpers/canvas.helpers";
import { parseToFixedWithoutZero } from "../../helpers/number.helpers";

import { Player } from "../../app/app.types";

import { AppContext } from "../../app/app.provider";

import BasketBallIcon from "../../assets/icons/basketBallIcon";

import styles from "./stats.module.css";

type PointerColor = {
  _id: string;
  color: string;
};

function Stats() {
  const { getGames, getPlayers, games, players, loading } =
    useContext(AppContext);
  const [statsTabAverage, setStatsTabAverage] = useState<boolean>(true);
  const [canv, setCanv] = useState<HTMLCanvasElement | undefined>(undefined);
  const [canvBound, setCanvBound] = useState<DOMRect | undefined>(undefined);
  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>(
    undefined
  );
  const [filterGame, setFilterGame] = useState<string | undefined>(undefined);
  const [filterPlayer, setFilterPlayer] = useState<string | undefined>(
    undefined
  );
  const { t } = useTranslation();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const WIDTH: number = DEFAULT_WIDTH * MULTIPLIER;
  const HEIGHT: number = DEFAULT_HEIGHT * MULTIPLIER;
  const DPI_WIDTH: number = WIDTH * 2;
  const DPI_HEIGHT: number = HEIGHT * 2;
  const POINTER_COLORS: PointerColor[] =
    players &&
    Array(players.length)
      .fill(0)
      .map((_, i) => ({ _id: players[i]._id, color: COLORS[i] }));

  useEffect(() => {
    getPlayers();
    getGames();
  }, [getPlayers, getGames]);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas) {
      canvas.style.width = `${WIDTH}px`;
      canvas.style.height = `${HEIGHT}px`;
      canvas.width = DPI_WIDTH;
      canvas.height = DPI_HEIGHT;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        setCanv(canvas);
        setCanvBound(canvas.getBoundingClientRect());
        setContext(ctx);
        drawCourt(ctx, DPI_WIDTH, DPI_HEIGHT, MULTIPLIER, 10);

        const filteredGames = filterGame
          ? games.filter((game) => game.date === filterGame)
          : games;

        filteredGames.forEach((game) =>
          game.playersStats.forEach((player) =>
            player.coordinates.forEach((coord) => {
              if (ctx) {
                ctx.beginPath();
                if (coord.miss) {
                  drawMiss(ctx, coord, 12, MULTIPLIER);
                } else {
                  drawMade(ctx, coord, 12, MULTIPLIER);
                }
                filterPlayer === player._id
                  ? (ctx.lineWidth = 9)
                  : (ctx.lineWidth = 7);
                ctx.closePath();
                if (players.length) {
                  filterPlayer
                    ? player._id === filterPlayer
                      ? (ctx.strokeStyle = POINTER_COLORS.filter(
                          (el) => el._id === player._id
                        )[0].color)
                      : (ctx.strokeStyle = `${
                          POINTER_COLORS.filter(
                            (el) => el._id === player._id
                          )[0].color
                        }33`)
                    : (ctx.strokeStyle = POINTER_COLORS.filter(
                        (el) => el._id === player._id
                      )[0].color);
                } else {
                  ctx.strokeStyle = "#c1c1c1";
                }
                ctx.stroke();
              }
            })
          )
        );
      }
    }
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
      games
        .filter((g) => !g.pending)
        .forEach((game, i) => {
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
          if (i === games.filter((g) => !g.pending).length - 1) {
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

  const countGameStats = (gameDate: string) => {
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
        .filter((g) => !g.pending)
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
              games
                .filter((g) => !g.pending)
                .filter((game) => game.date === gameDate)[0].playersStats
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
    pts: number,
    reb: number,
    ast: number,
    stl: number,
    blk: number,
    tovs: number,
    fouls: number,
    plus_minus: number,
    two_fga: number,
    two_fgm: number,
    two_fgp: number,
    three_fga: number,
    three_fgm: number,
    three_fgp: number,
    fta: number,
    ftm: number,
    ftp: number,
    fga: number,
    fgm: number,
    fgp: number,
    gPlayed: number = 0
  ) => {
    const gp = !gPlayed ? games.filter((g) => !g.pending).length : gPlayed;
    return (
      <div className={styles.statsColumnRowsInfo}>
        {!filterGame ? (
          <div className={styles.allGamesStatsTabs}>
            <button
              type="button"
              onClick={() => setStatsTabAverage(true)}
              className={`${statsTabAverage ? styles.activeTab : ""}`}
            >
              {t("Average")}
            </button>
            <button
              type="button"
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
              ? gp
                ? parseToFixedWithoutZero(pts / gp)
                : 0
              : parseToFixedWithoutZero(pts)}
          </span>
        </div>
        <div className={styles.statsColumnRowsItem}>
          <span>
            {t("2PA")}:{" "}
            {statsTabAverage && !filterGame
              ? gp
                ? parseToFixedWithoutZero(two_fga / gp)
                : 0
              : parseToFixedWithoutZero(two_fga)}
          </span>
          <span>
            {t("2PM")}:{" "}
            {statsTabAverage && !filterGame
              ? gp
                ? parseToFixedWithoutZero(two_fgm / gp)
                : 0
              : parseToFixedWithoutZero(two_fgm)}
          </span>
          <span>
            {t("2P")}%: {parseToFixedWithoutZero(two_fgp)}
          </span>
        </div>
        <div className={styles.statsColumnRowsItem}>
          <span>
            {t("3PA")}:{" "}
            {statsTabAverage && !filterGame
              ? gp
                ? parseToFixedWithoutZero(three_fga / gp)
                : 0
              : parseToFixedWithoutZero(three_fga)}
          </span>
          <span>
            {t("3PM")}:{" "}
            {statsTabAverage && !filterGame
              ? gp
                ? parseToFixedWithoutZero(three_fgm / gp)
                : 0
              : parseToFixedWithoutZero(three_fgm)}
          </span>
          <span>
            {t("3P")}%: {parseToFixedWithoutZero(three_fgp)}
          </span>
        </div>
        <div className={styles.statsColumnRowsItem}>
          <span>
            {t("FTA")}:{" "}
            {statsTabAverage && !filterGame
              ? gp
                ? parseToFixedWithoutZero(fta / gp)
                : 0
              : parseToFixedWithoutZero(fta)}
          </span>
          <span>
            {t("FTM")}:{" "}
            {statsTabAverage && !filterGame
              ? gp
                ? parseToFixedWithoutZero(ftm / gp)
                : 0
              : parseToFixedWithoutZero(ftm)}
          </span>
          <span>FT%: {parseToFixedWithoutZero(ftp)}</span>
        </div>
        <div className={styles.statsColumnRowsItem}>
          <span>
            {t("FGA")}:{" "}
            {statsTabAverage && !filterGame
              ? gp
                ? parseToFixedWithoutZero(fga / gp)
                : 0
              : parseToFixedWithoutZero(fga)}
          </span>
          <span>
            {t("FGM")}:{" "}
            {statsTabAverage && !filterGame
              ? gp
                ? parseToFixedWithoutZero(fgm / gp)
                : 0
              : parseToFixedWithoutZero(fgm)}
          </span>
          <span>FG%: {parseToFixedWithoutZero(fgp)}</span>
        </div>
        <div className={styles.statsColumnRowsItem}>
          <span>
            {t("Reb")}:{" "}
            {statsTabAverage && !filterGame
              ? gp
                ? parseToFixedWithoutZero(reb / gp)
                : 0
              : parseToFixedWithoutZero(reb)}
          </span>
          <span>
            {t("Ast")}:{" "}
            {statsTabAverage && !filterGame
              ? gp
                ? parseToFixedWithoutZero(ast / gp)
                : 0
              : parseToFixedWithoutZero(ast)}
          </span>
          <span>
            {t("Stl")}:{" "}
            {statsTabAverage && !filterGame
              ? gp
                ? parseToFixedWithoutZero(stl / gp)
                : 0
              : parseToFixedWithoutZero(stl)}
          </span>
          <span>
            {t("Blk")}:{" "}
            {statsTabAverage && !filterGame
              ? gp
                ? parseToFixedWithoutZero(blk / gp)
                : 0
              : parseToFixedWithoutZero(blk)}
          </span>
          <span>
            {t("Tov")}:{" "}
            {statsTabAverage && !filterGame
              ? gp
                ? parseToFixedWithoutZero(tovs / gp)
                : 0
              : parseToFixedWithoutZero(tovs)}
          </span>
          <span>
            {t("Fouls")}:{" "}
            {statsTabAverage && !filterGame
              ? gp
                ? parseToFixedWithoutZero(fouls / gp)
                : 0
              : parseToFixedWithoutZero(fouls)}
          </span>
          <span>
            {"+/-"} :{" "}
            {statsTabAverage && !filterGame
              ? gp
                ? parseToFixedWithoutZero(plus_minus / gp)
                : 0
              : parseToFixedWithoutZero(plus_minus)}
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
              players.map((player: Player, i: number) => (
                <div
                  className={styles.statsColumnRowsPlayersItem}
                  key={player.name}
                >
                  <span
                    className={styles.playerColorStick}
                    style={{
                      backgroundColor: POINTER_COLORS[i].color,
                    }}
                  />
                  <span
                    className={
                      filterPlayer === player._id
                        ? styles.activePlayerFilter
                        : ""
                    }
                    onClick={() =>
                      setFilterPlayer(
                        filterPlayer === player._id ? undefined : player._id
                      )
                    }
                  >
                    {player.name}, {player.position}
                  </span>
                </div>
              ))
            ) : (
              <BasketBallIcon width="120px" height="120px" />
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
            <BasketBallIcon width="120px" height="120px" />
          )}
        </div>
      </div>
      <div className={`${styles.statsWrap} ${loading ? styles.loading : ""}`}>
        <h3 className="title">{t("Games")}</h3>
        {!loading ? (
          <div className={styles.gamesWrap}>
            {games.length ? (
              games
                .filter((g) => !g.pending)
                .map((game, i) => (
                  <div
                    className={`${styles.gameCard} ${
                      filterGame === game.date ? styles.activeCard : ""
                    }`}
                    onClick={() =>
                      setFilterGame(
                        filterGame === game.date ? undefined : game.date
                      )
                    }
                    key={`${game.date}-${game.time}`}
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
          <BasketBallIcon width="120px" height="120px" />
        )}
      </div>
    </div>
  );
}

export default Stats;
