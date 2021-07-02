import React, { useRef, useState, useEffect } from "react";

import styles from "./gamePlayerCanvas.module.css";

function GamePlayerCanvas({ coordinates, mode, canvID }) {
  // const [newCoords, setNewCoords] = useState([]);
  const [drawType, setDrawType] = useState(false);
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
    var ctx = canvas.getContext("2d");

    canvas.style.width = WIDTH + "px";
    canvas.style.height = HEIGHT + "px";
    canvas.width = DPI_WIDTH;
    canvas.height = DPI_HEIGHT;

    if (mode === "view") {
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
    }
  }, [DPI_HEIGHT, DPI_WIDTH, coordinates, mode]);

  // const draw = e => {
  //   if (mode !== "view") {
  //     console.log(e);
  //     if (!e.target.matches(canvID)) return;
  //     var pos = getMousePos(canvas, e);
  //     console.log(pos);

  //     let posx = pos.x;
  //     let posy = pos.y;
  //     drawType === true
  //       ? (ctx.fillStyle = "#008000")
  //       : (ctx.fillStyle = "#ff0000");
  //     ctx.fillRect(posx, posy, 15, 15);
  //     newCoords.push({ x: posx, y: posy, miss: !drawType });
  //   }
  // };

  // const getMousePos = (canvas, evt) => {
  //   var rect = canvas.getBoundingClientRect();
  //   return {
  //     x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
  //     y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
  //   };
  // };

  return (
    <div className={styles.gamePlayerCanvasWrap}>
      <canvas
        ref={canvasRef}
        className={styles.gamePlayerCanvas}
        id={canvID}
        // onClick={e => draw(e)}
      ></canvas>
      {mode !== "view" ? (
        <div class={styles.gamePlayerCanvasButtons}>
          <div
            className={`hit ${
              drawType ? styles.gamePlayerCanvasButtonsHitActive : ""
            }`}
            onClick={() => setDrawType(!drawType)}
          >
            Hit
          </div>
          <div
            className={`miss ${
              !drawType ? styles.gamePlayerCanvasButtonsMissActive : ""
            }`}
            onClick={() => setDrawType(!drawType)}
          >
            Miss
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GamePlayerCanvas;
