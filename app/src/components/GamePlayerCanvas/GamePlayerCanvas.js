import React, { useRef, useState, useEffect } from "react";

import styles from "./gamePlayerCanvas.module.css";

function GamePlayerCanvas({
  coordinates = [],
  mode = "edit",
  canvID,
  handleGetCoords = () => {},
}) {
  const [newCoords, setNewCoords] = useState([]);
  const [canv, setCanv] = useState(undefined);
  const [canvBound, setCanvBound] = useState(undefined);
  const [context, setContext] = useState(undefined);
  const [drawType, setDrawType] = useState(true);

  const canvasRef = useRef(null);

  const WIDTH = 290;
  const HEIGHT = 310;
  const DPI_WIDTH = WIDTH * 2;
  const DPI_HEIGHT = HEIGHT * 2;

  const drawMiss = (ctx, element) => {
    ctx.moveTo(element.x - 10, element.y - 10);
    ctx.lineTo(element.x + 10, element.y + 10);
    ctx.moveTo(element.x + 10, element.y - 10);
    ctx.lineTo(element.x - 10, element.y + 10);
  };
  const drawMade = (ctx, element) =>
    ctx.arc(element.x, element.y, 10, 0, 2 * Math.PI);

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

    if (!coordinates.length) coordinates = newCoords;
    coordinates.forEach((el) => {
      ctx.beginPath();
      if (el.miss) {
        drawMiss(ctx, el);
      } else {
        drawMade(ctx, el);
      }
      ctx.lineWidth = 5;
      ctx.closePath();
      el.miss ? (ctx.strokeStyle = "#ff0000") : (ctx.strokeStyle = "#00d000");
      ctx.stroke();
    });
    handleGetCoords(newCoords);
  }, [newCoords]);

  const draw = (e) => {
    if (mode !== "view") {
      const { x, y } = getMousePos(e);
      drawType === true
        ? (context.fillStyle = "#008000")
        : (context.fillStyle = "#ff0000");
      context.fillRect(x, y, 15, 15);
      x >= 0 && y >= 0
        ? setNewCoords((oldState) => [...oldState, { x, y, miss: !drawType }])
        : setNewCoords((oldState) => [...oldState, { x: 0, y: 0, miss: true }]);
    }
  };

  const getMousePos = (evt) => {
    return {
      x:
        ((evt.clientX - canvBound.left) / (canvBound.right - canvBound.left)) *
        canv.width,
      y:
        ((evt.clientY - canvBound.top) / (canvBound.bottom - canvBound.top)) *
        canv.height,
    };
  };

  return (
    <div className={styles.gamePlayerCanvasWrap}>
      <canvas
        ref={canvasRef}
        className={styles.gamePlayerCanvas}
        id={canvID}
        onClick={(e) => draw(e)}
      ></canvas>
      {mode === "edit" ? (
        <div className={styles.gamePlayerCanvasButtons}>
          <div
            className={`${styles.hit} ${
              drawType ? styles.gamePlayerCanvasButtonsHitActive : ""
            }`}
            onClick={() => setDrawType(true)}
          >
            Hit
          </div>
          <div
            className={`${styles.miss} ${
              !drawType ? styles.gamePlayerCanvasButtonsMissActive : ""
            }`}
            onClick={() => setDrawType(false)}
          >
            Miss
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GamePlayerCanvas;
