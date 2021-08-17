import React, { useRef, useState, useEffect } from "react";

import { zones } from "./zones";

import styles from "./playerCanvas.module.css";

function PlayerCanvas({ player, games }) {
  const [coords, setCoords] = useState([]);
  const [canv, setCanv] = useState(undefined);
  const [canvBound, setCanvBound] = useState(undefined);
  const [context, setContext] = useState(undefined);

  const canvasRef = useRef(null);

  const WIDTH = 374;
  const HEIGHT = 400;
  const DPI_WIDTH = WIDTH * 2;
  const DPI_HEIGHT = HEIGHT * 2;
  const MULTIPLIER = 1.289655172;

  useEffect(() => {
    setCoords(
      games.length &&
        games
          .filter((game) => !game.pending)
          .map((game) => game.playersStats.find((pl) => pl._id === player))
          .map((p) => p.coordinates)
          .reduce((prev, cur) => prev.concat(cur))
    );
  }, [games]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.width = WIDTH + "px";
    canvas.style.height = HEIGHT + "px";
    canvas.width = DPI_WIDTH;
    canvas.height = DPI_HEIGHT;
    var ctx = canvas.getContext("2d");
    const zonesPoints = Array(14).fill(0);

    setCanv(canvas);
    setCanvBound(canvas.getBoundingClientRect());
    setContext(ctx);

    coords &&
      coords.forEach((el) => {
        zones.forEach((zone, id) => {
          if (
            ctx.isPointInPath(zone.path, el.x * MULTIPLIER, el.y * MULTIPLIER)
          )
            zonesPoints[id] += 1;
        });
      });

    drawZones(ctx, zonesPoints);
  }, [coords]);

  const drawZones = (ctx, zonesPoints) => {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;
    zones.forEach((zone, id) => {
      ctx.beginPath();
      ctx.fillStyle = "rgb(255, 255, 0, 0.15)";
      ctx.stroke(zone.path);
      ctx.fill(zone.path);

      ctx.font = "48px serif";
      ctx.fillStyle = "#000000";
      ctx.fillText(zonesPoints[id], zone.tPoint.x, zone.tPoint.y);
    });
  };

  return (
    <div className={styles.gamePlayerCanvasWrap}>
      <canvas ref={canvasRef} className={styles.gamePlayerCanvas}></canvas>
    </div>
  );
}

export default PlayerCanvas;
