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

  const getGames = async () => {
    try {
      const data = await request("/api/game/games", "POST", {});
      if (data) setGames(Object.values(data).filter((game) => !game.pending));
    } catch (e) {}
  };
  const getPlayers = async () => {
    try {
      const data = await request("/api/player/players", "POST", {});
      if (data) setPlayers(Object.values(data).filter((game) => !game.pending));
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

  useEffect(() => {
    getGames();
    getPlayers();
  }, []);

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

    if (filterPlayer) {
      // const filtByPlayer = filteredGames.map((game) =>
      //   game.playersStats.forEach((player) =>
      //     player._id === filterPlayer ? player.coordinates : null
      //   )
      // );
      // console.log(filtByPlayer);
      // console.log(
      //   filteredGames.map((game) =>
      //     game.playersStats.filter((player) => player._id === filterPlayer)
      //   )
      // );
    }

    filteredGames.forEach((game) =>
      game.playersStats.forEach((player) =>
        player.coordinates.forEach((coord) => {
          ctx.beginPath();
          if (coord.miss) {
            drawMiss(ctx, coord);
          } else {
            drawMade(ctx, coord);
          }
          ctx.lineWidth = 7;
          ctx.closePath();
          coord.miss
            ? (ctx.strokeStyle = "#ff0000")
            : (ctx.strokeStyle = "#00d000");
          ctx.stroke();
        })
      )
    );
  }, [games, players, filterGame, filterPlayer]);

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
    games.forEach((game) =>
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
      })
    );
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
  ) => (
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

  return (
    <div className="stats page-wrapper">
      <h2 className="title">Stats</h2>
      <div className={styles.statsTop}>
        <div className={styles.statsColumn}>
          <h5>Players</h5>
          <div className={styles.statsColumnRows}>
            {!loading ? (
              players.map((player, i) => (
                <span
                  key={i}
                  className={
                    filterPlayer === player._id ? styles.activePlayerFilter : ""
                  }
                  onClick={() => setFilterPlayer(player._id)}
                >
                  {player.name}, {player.position}
                </span>
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
