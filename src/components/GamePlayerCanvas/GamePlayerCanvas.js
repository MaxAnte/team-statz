import React, { useRef, useEffect } from "react";

import "./GamePlayerCanvas.scss";

function GamePlayerCanvas({ coordinates, mode, canvID }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const WIDTH = 290;
    const HEIGHT = 310;
    const DPI_WIDTH = WIDTH * 2;
    const DPI_HEIGHT = HEIGHT * 2;
    // const newCoords = [];

    const canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    canvas.style.width = WIDTH + "px";
    canvas.style.height = HEIGHT + "px";
    canvas.width = DPI_WIDTH;
    canvas.height = DPI_HEIGHT;
    // let drawType = true;

    if (mode === "view") {
      coordinates.forEach(el => {
        el.miss ? (ctx.fillStyle = "#ff0000") : (ctx.fillStyle = "#07ef39");
        ctx.fillRect(el.x, el.y, 15, 15);
      });
    }
  }, []);

  // const draw = e => {
  //   if (!mode === "view") {
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

  // const changeDrawMode = e => {
  //   if (e.target.matches(".hit")) {
  //     drawType = true;
  //     e.target.classList.add("is-active");
  //     document.getElementsByClassName("miss")[0].classList.remove("is-active");
  //   }
  //   if (e.target.matches(".miss")) {
  //     drawType = false;
  //     e.target.classList.add("is-active");
  //     document.getElementsByClassName("hit")[0].classList.remove("is-active");
  //   }
  // };

  return (
    <div className="gamePlayerCanvas__wrap">
      <canvas
        ref={canvasRef}
        className="gamePlayerCanvas"
        id={canvID}
        // onClick={e => draw(e)}
      ></canvas>
      {mode === "view" ? (
        ""
      ) : (
        <div class="buttons">
          <div
            class="hit"
            // onClick={e => {
            //   changeDrawMode(e);
            // }}
          >
            Hit
          </div>
          <div
            class="miss"
            // onClick={e => {
            //   changeDrawMode(e);
            // }}
          >
            Miss
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePlayerCanvas;
