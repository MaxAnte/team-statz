/* eslint-disable */
import React, { useRef, useState, useEffect } from "react";
import { Coord, Game } from "../../context/app.types";

import { zones } from "./zones";

import styles from "./playerCanvas.module.css";

type Props = {
  player: string;
  games: Game[];
};

function PlayerCanvas({ player, games }: Props) {
  const [coords, setCoords] = useState<Coord[] | undefined>([]);
  const [canv, setCanv] = useState<HTMLCanvasElement | undefined>(undefined);
  const [canvBound, setCanvBound] = useState<DOMRect | undefined>(undefined);
  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>(
    undefined
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const WIDTH: number = 374;
  const HEIGHT: number = 400;
  const DPI_WIDTH: number = WIDTH * 2;
  const DPI_HEIGHT: number = HEIGHT * 2;
  const MULTIPLIER: number = 1.289655172;

  useEffect(() => {
    if (games.length) {
      const filteredGames = games
        .filter((game) => !game.pending)
        .map((game) => game.playersStats.find((pl) => pl._id === player))
        .filter((game) => Boolean(game))
        .map((p) => p?.coordinates);

      if (filteredGames) {
        setCoords(
          filteredGames.reduce((prev, cur) => {
            if (prev && cur) {
              return prev.concat(cur);
            }
          }, [])
        );
      }
    }
  }, [games, player]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.width = WIDTH + "px";
      canvas.style.height = HEIGHT + "px";
      canvas.width = DPI_WIDTH;
      canvas.height = DPI_HEIGHT;
      var ctx = canvas.getContext("2d");
      if (ctx) {
        const zonesAttempts: number[] = Array(14).fill(0);
        const zonesMade: number[] = Array(14).fill(0);
        setCanv(canvas);
        setCanvBound(canvas.getBoundingClientRect());
        setContext(ctx);

        coords &&
          coords.forEach((el) => {
            zones.forEach((zone, id) => {
              if (
                ctx &&
                ctx.isPointInPath(
                  zone.path,
                  el.x * MULTIPLIER,
                  el.y * MULTIPLIER
                )
              ) {
                zonesAttempts[id] += 1;
                zonesMade[id] += el.miss ? 0 : 1;
              }
            });
          });

        const zonesPerc = zonesMade.map((el, id) =>
          el ? parseFloat(((el * 100) / zonesAttempts[id]).toFixed(1)) : 0
        );

        drawZones(ctx, zonesAttempts, zonesPerc);
      }
    }
  }, [coords, DPI_WIDTH, DPI_HEIGHT]);

  const drawZones = (
    ctx: CanvasRenderingContext2D,
    zonesAttempts: number[],
    zonesPerc: number[]
  ) => {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;
    zones.forEach((zone, id) => {
      ctx.beginPath();
      if (zonesAttempts[id]) {
        if (id < 5) {
          ctx.fillStyle =
            zonesPerc[id] > 30
              ? zonesPerc[id] > 35
                ? "rgb(49, 173, 49, 0.65)"
                : "rgba(255, 255, 0, 0.65)"
              : "rgba(255, 0, 0, 0.65)";
        } else if (id >= 5 && id < 13) {
          ctx.fillStyle =
            zonesPerc[id] > 35
              ? zonesPerc[id] > 40
                ? "rgb(49, 173, 49, 0.65)"
                : "rgba(255, 255, 0, 0.65)"
              : "rgba(255, 0, 0, 0.65)";
        } else {
          ctx.fillStyle =
            zonesPerc[id] > 50
              ? zonesPerc[id] > 70
                ? "rgb(49, 173, 49, 0.65)"
                : "rgba(255, 255, 0, 0.65)"
              : "rgba(255, 0, 0, 0.65)";
        }
      } else {
        ctx.fillStyle = "rgb(50, 50, 50, 0.5)";
      }
      ctx.stroke(zone.path);
      ctx.fill(zone.path);

      ctx.font = "48px serif";
      ctx.fillStyle = "#000000";
      ctx.fillText(
        `${zonesAttempts[id] ? `${zonesPerc[id]}%` : "--"}`,
        zone.tPoint.x,
        zone.tPoint.y
      );
    });
  };

  return (
    <div className={styles.gamePlayerCanvasWrap}>
      <canvas ref={canvasRef} className={styles.gamePlayerCanvas}></canvas>
    </div>
  );
}

export default PlayerCanvas;
