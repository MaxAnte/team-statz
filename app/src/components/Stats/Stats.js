import React, { useState, useEffect, useRef } from "react";
import { useHttp } from "../../hooks/http.hook";

import BlockLoader from "../Loader/BlockLoader";

import styles from "./stats.module.css";

function Stats() {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
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

    // filteredGames = filterPlayer
    //   ? filteredGames.filter((game) =>
    //       game.playersStats.filter((player) => player.name === filterPlayer)
    //     )
    //   : filteredGames;

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

  return (
    <div className="stats page-wrapper">
      <h2 className="title">Stats</h2>
      <div className={styles.statsTop}>
        <canvas
          ref={canvasRef}
          className={styles.canvasStats}
          id="canvasStats"
        />
        <div className={styles.statsPlayers}>
          {!loading ? (
            players.map((player, i) => (
              <span
                key={i}
                className={
                  filterPlayer === player.name ? styles.activePlayerFilter : ""
                }
                onClick={() => setFilterPlayer(player.name)}
              >
                {player.name}, {player.position}
              </span>
            ))
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
