import React, { useState, useEffect, useRef } from "react";
import { useHttp } from "../../hooks/http.hook";

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

  const { loading, request } = useHttp();

  const canvasRef = useRef(null);

  const WIDTH = 700;
  const HEIGHT = 750;
  const DPI_WIDTH = WIDTH * 2;
  const DPI_HEIGHT = HEIGHT * 2;
  const MULTIPLIER = 2.4;
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

  const getDB = async () => {
    try {
      const gamesData = await request("/api/game/games", "POST", {});
      const playersData = await request("/api/player/players", "POST", {});
      if (gamesData && playersData) {
        setGames(Object.values(gamesData).filter((game) => !game.pending));
        setPlayers(Object.values(playersData).filter((game) => !game.pending));
      }
    } catch (e) {}
  };

  const drawMiss = (ctx, element) => {
    ctx.moveTo(element.x * MULTIPLIER - 12, element.y * MULTIPLIER - 12);
    ctx.lineTo(element.x * MULTIPLIER + 12, element.y * MULTIPLIER + 12);
    ctx.moveTo(element.x * MULTIPLIER + 12, element.y * MULTIPLIER - 12);
    ctx.lineTo(element.x * MULTIPLIER - 12, element.y * MULTIPLIER + 12);
  };
  const drawMade = (ctx, element) =>
    ctx.arc(element.x * MULTIPLIER, element.y * MULTIPLIER, 12, 0, 2 * Math.PI);

  useEffect(() => getDB(), []);

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
  }, [filterGame, filterPlayer]);

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
    let fouls = 0;
    let tovs = 0;
    games
      .filter((game) => game.date === gameDate)[0]
      .playersStats.forEach((player) => {
        if (filterPlayer) {
          if (filterPlayer === player._id) {
            pts += player.pts;
            reb += player.oreb + player.dreb;
            ast += player.ast;
            stl += player.stl;
            blk += player.blk;
            tovs += player.tov;
            fouls += player.fouls;
            two_fga += player.two_pa;
            two_fgm += player.two_pm;
            two_fgp +=
              two_fga === 0 || two_fgm === 0 ? 0 : (two_fgm * 100) / two_fga;
            three_fga += player.three_pa;
            three_fgm += player.three_pm;
            three_fgp +=
              three_fga === 0 || three_fgm === 0
                ? 0
                : (three_fgm * 100) / three_fga;
            fga += two_fga + three_fga;
            fgm += two_fgm + three_fgm;
            fgp += two_fgp + three_fgp;
          }
        } else {
          pts += player.pts;
          reb += player.oreb + player.dreb;
          ast += player.ast;
          stl += player.stl;
          blk += player.blk;
          tovs += player.tov;
          fouls += player.fouls;
          two_fga += player.two_pa;
          two_fgm += player.two_pm;
          two_fgp +=
            two_fga === 0 || two_fgm === 0 ? 0 : (two_fgm * 100) / two_fga;
          three_fga += player.three_pa;
          three_fgm += player.three_pm;
          three_fgp +=
            three_fga === 0 || three_fgm === 0
              ? 0
              : (three_fgm * 100) / three_fga;
          fga += two_fga + three_fga;
          fgm += two_fgm + three_fgm;
          fgp += two_fgp + three_fgp;
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
      two_fga,
      two_fgm,
      two_fgp,
      three_fga,
      three_fgm,
      three_fgp,
      fga,
      fgm,
      fgp
    );
  };
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
    let fouls = 0;
    let tovs = 0;
    console.log("overall");
    games.forEach((game) => {
      if (filterPlayer) {
        if (
          game.playersStats.filter((player) => player._id === filterPlayer)
            .length
        ) {
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
              two_fga += stats.two_pa;
              two_fgm += stats.two_pm;
              two_fgp +=
                two_fga === 0 || two_fgm === 0 ? 0 : (two_fgm * 100) / two_fga;
              three_fga += stats.three_pa;
              three_fgm += stats.three_pm;
              three_fgp +=
                three_fga === 0 || three_fgm === 0
                  ? 0
                  : (three_fgm * 100) / three_fga;
              fga += two_fga + three_fga;
              fgm += two_fgm + three_fgm;
              fgp += two_fgp + three_fgp;
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
          two_fga += player.two_pa;
          two_fgm += player.two_pm;
          two_fgp +=
            two_fga === 0 || two_fgm === 0 ? 0 : (two_fgm * 100) / two_fga;
          three_fga += player.three_pa;
          three_fgm += player.three_pm;
          three_fgp +=
            three_fga === 0 || three_fgm === 0
              ? 0
              : (three_fgm * 100) / three_fga;
          fga += two_fga + three_fga;
          fgm += two_fgm + three_fgm;
          fgp += two_fgp + three_fgp;
        });
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
      two_fga,
      two_fgm,
      two_fgp,
      three_fga,
      three_fgm,
      three_fgp,
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
    two_fga,
    two_fgm,
    two_fgp,
    three_fga,
    three_fgm,
    three_fgp,
    fga,
    fgm,
    fgp
  ) => {
    console.log(
      "l",
      pts,
      reb,
      ast,
      stl,
      blk,
      tovs,
      fouls,
      two_fga,
      two_fgm,
      two_fgp,
      three_fga,
      three_fgm,
      three_fgp,
      fga,
      fgm,
      fgp
    );
    return (
      <div className={styles.statsColumnRowsInfo}>
        {!filterGame ? (
          <div className={styles.allGamesStatsTabs}>
            <button
              onClick={() => setStatsTabAverage(true)}
              className={`${statsTabAverage ? styles.activeTab : ""}`}
            >
              Average
            </button>
            <button
              onClick={() => setStatsTabAverage(false)}
              className={`${!statsTabAverage ? styles.activeTab : ""}`}
            >
              Overall
            </button>
          </div>
        ) : null}
        <div className={styles.statsColumnRowsItem}>
          <span>Pts: {statsTabAverage ? pts / games.length : pts}</span>
        </div>
        <div className={styles.statsColumnRowsItem}>
          <span>2PA: {statsTabAverage ? two_fga / games.length : two_fga}</span>
          <span>2PM: {statsTabAverage ? two_fgm / games.length : two_fgm}</span>
          <span>2P%: {two_fgp / games.length}</span>
        </div>
        <div className={styles.statsColumnRowsItem}>
          <span>
            3PA: {statsTabAverage ? three_fga / games.length : three_fga}
          </span>
          <span>
            3PM: {statsTabAverage ? three_fgm / games.length : three_fgm}
          </span>
          <span>3P%: {three_fgp / games.length}</span>
        </div>
        <div className={styles.statsColumnRowsItem}>
          <span>FGA: {statsTabAverage ? fga / games.length : fga}</span>
          <span>FGM: {statsTabAverage ? fgm / games.length : fgm}</span>
          <span>FG%: {fgp / games.length}</span>
        </div>
        <div className={styles.statsColumnRowsItem}>
          <span>Reb: {statsTabAverage ? reb / games.length : reb}</span>
          <span>Ast: {statsTabAverage ? ast / games.length : ast}</span>
          <span>Stl: {statsTabAverage ? stl / games.length : stl}</span>
          <span>Blk: {statsTabAverage ? blk / games.length : blk}</span>
          <span>Tov: {statsTabAverage ? tovs / games.length : tovs}</span>
          <span>Fouls: {statsTabAverage ? fouls / games.length : fouls}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="stats page-wrapper">
      <h2 className="title">Stats</h2>
      <div className={styles.statsTop}>
        <div className={styles.statsColumn}>
          <h5>Players</h5>
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
          <h5>Game stats</h5>
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
        {!loading ? (
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
              <h4 className={styles.calendarGameName}>vs. {game.enemy}</h4>
              <div className={styles.calendarGameScore}>
                <span
                  className={`our ${
                    game.ourScore > game.enemyScore ? styles.win : styles.lose
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
          <BlockLoader />
        )}
      </div>
    </div>
  );
}

export default Stats;
