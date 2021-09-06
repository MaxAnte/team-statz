import React, { useState, useEffect, useRef } from "react";

import { brackets } from "../PlayerCanvas/zones";

import styles from "./bracketCanvas.module.css";

function BracketCanvas() {
  const [canv, setCanv] = useState(undefined);
  const [canvBound, setCanvBound] = useState(undefined);
  const [context, setContext] = useState(undefined);

  const canvasRef = useRef(null);

  const WIDTH = 1580;
  const HEIGHT = 660;
  const DPI_WIDTH = WIDTH * 2;
  const DPI_HEIGHT = HEIGHT * 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.width = WIDTH + "px";
    canvas.style.height = HEIGHT + "px";
    canvas.width = DPI_WIDTH;
    canvas.height = DPI_HEIGHT;
    var ctx = canvas.getContext("2d");
    setCanv(canvas);
    setCanvBound(canvas.getBoundingClientRect());
    setContext(ctx);

    drawBracket(ctx);
  }, [DPI_WIDTH, DPI_HEIGHT]);

  const drawBracket = (ctx) => {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.fillStyle = "transparent";
    brackets.forEach((match) => {
      ctx.stroke(match);
      ctx.fill(match);
    });

    // ctx.font = "48px serif";
    // ctx.fillStyle = "#000000";
    // ctx.fillText(
    //   `${zonesAttempts[id] ? `${zonesPerc[id]}%` : "--"}`,
    //   zone.tPoint.x,
    //   zone.tPoint.y
    // );
  };

  return <canvas style={{ border: "1px solid #000" }} ref={canvasRef}></canvas>;
}

export default BracketCanvas;
