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

    ctx.strokeStyle = "#f00";
    ctx.fillStyle = "#f00";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 0);
    ctx.lineTo(280, 305);
    ctx.arc(280, 545, 240, (Math.PI * 3) / 2, Math.PI, true);
    ctx.stroke();
    ctx.fill();
    ctx.moveTo(50, 605);
    ctx.lineTo(0, 600);
    ctx.closePath();
  }, []);

  return (
    <div className={styles.gamePlayerCanvasWrap}>
      <canvas ref={canvasRef} className={styles.gamePlayerCanvas}></canvas>
    </div>
  );
}

export default PlayerCanvas;
