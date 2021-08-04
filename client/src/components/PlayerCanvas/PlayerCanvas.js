import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import styles from "./playerCanvas.module.css";

function PlayerCanvas() {
  const [canv, setCanv] = useState(undefined);
  const [canvBound, setCanvBound] = useState(undefined);
  const [context, setContext] = useState(undefined);
  const { t } = useTranslation();

  const canvasRef = useRef(null);

  const WIDTH = 381;
  const HEIGHT = 355;
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

    ctx.fillStyle = "rgb(255, 255, 0, 0.35)";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 0);
    ctx.lineTo(280, 300);
    ctx.quadraticCurveTo(75, 375, 43, 555);
    ctx.lineTo(0, 555);
    ctx.fill();

    ctx.fillStyle = "rgb(255, 51, 51, 0.35)";
    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(560, 0);
    ctx.lineTo(480, 300);
    ctx.quadraticCurveTo(390, 275, 280, 300);
    ctx.fill();

    ctx.fillStyle = "rgb(255, 255, 0, 0.35)";
    ctx.beginPath();
    ctx.moveTo(760, 0);
    ctx.lineTo(560, 0);
    ctx.lineTo(480, 300);
    ctx.quadraticCurveTo(680, 355, 720, 555);
    ctx.lineTo(760, 555);
    ctx.fill();

    ctx.fillStyle = "rgb(255, 51, 51, 0.35)";
    ctx.beginPath();
    ctx.moveTo(0, 555);
    ctx.lineTo(43, 555);
    ctx.lineTo(43, 730);
    ctx.lineTo(0, 730);
    ctx.fill();

    ctx.fillStyle = "rgb(255, 51, 51, 0.35)";
    ctx.beginPath();
    ctx.moveTo(760, 555);
    ctx.lineTo(720, 555);
    ctx.lineTo(720, 730);
    ctx.lineTo(760, 730);
    ctx.fill();

    ctx.stroke();
  }, []);

  return (
    <div className={styles.gamePlayerCanvasWrap}>
      <canvas ref={canvasRef} className={styles.gamePlayerCanvas}></canvas>
    </div>
  );
}

export default PlayerCanvas;
