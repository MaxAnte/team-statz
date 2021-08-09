import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import styles from "./playerCanvas.module.css";

function PlayerCanvas({ player, games }) {
  const [coords, setCoords] = useState([]);
  const [canv, setCanv] = useState(undefined);
  const [canvBound, setCanvBound] = useState(undefined);
  const [context, setContext] = useState(undefined);
  const { t } = useTranslation();

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

    setCanv(canvas);
    setCanvBound(canvas.getBoundingClientRect());
    setContext(ctx);

    coords &&
      coords.forEach((el) => {
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

    drawZones(ctx);
  }, [coords]);

  const drawMiss = (ctx, element) => {
    ctx.moveTo(element.x * MULTIPLIER - 10, element.y * MULTIPLIER - 10);
    ctx.lineTo(element.x * MULTIPLIER + 10, element.y * MULTIPLIER + 10);
    ctx.moveTo(element.x * MULTIPLIER + 10, element.y * MULTIPLIER - 10);
    ctx.lineTo(element.x * MULTIPLIER - 10, element.y * MULTIPLIER + 10);
  };
  const drawMade = (ctx, element) =>
    ctx.arc(element.x * MULTIPLIER, element.y * MULTIPLIER, 10, 0, 2 * Math.PI);

  const drawZones = (ctx) => {
    // remember about that canvas is rotated in css
    // 3pt right top
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "rgb(255, 255, 0, 0.15)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(363, 0);
    ctx.lineTo(464, 88);
    ctx.quadraticCurveTo(355, 163, 317, 290);
    ctx.lineTo(0, 208);
    ctx.fill();
    ctx.stroke();

    // 3pt left top
    ctx.fillStyle = "rgb(255, 255, 0, 0.15)";
    ctx.beginPath();
    ctx.moveTo(0, 800);
    ctx.lineTo(363, 800);
    ctx.lineTo(464, 712);
    ctx.quadraticCurveTo(355, 637, 317, 510);
    ctx.lineTo(0, 592);
    ctx.fill();
    ctx.stroke();

    // // 3pt middle top
    ctx.fillStyle = "rgb(255, 51, 51, 0.15)";
    ctx.beginPath();
    ctx.moveTo(0, 208);
    ctx.lineTo(0, 592);
    ctx.lineTo(317, 510);
    ctx.quadraticCurveTo(285, 390, 317, 290);
    ctx.fill();
    ctx.stroke();

    // 3pt right bottom
    ctx.fillStyle = "rgb(255, 51, 51, 0.15)";
    ctx.beginPath();
    ctx.moveTo(748, 0);
    ctx.lineTo(363, 0);
    ctx.lineTo(464, 88);
    ctx.quadraticCurveTo(520, 55, 590, 44);
    ctx.lineTo(748, 44);
    ctx.fill();
    ctx.stroke();

    // 3pt left bottom
    ctx.fillStyle = "rgb(255, 51, 51, 0.15)";
    ctx.beginPath();
    ctx.moveTo(748, 800);
    ctx.lineTo(363, 800);
    ctx.lineTo(464, 712);
    ctx.quadraticCurveTo(520, 745, 590, 756);
    ctx.lineTo(748, 756);
    ctx.fill();
    ctx.stroke();

    // 2p right bottom
    ctx.fillStyle = "rgb(92, 4, 165, 0.15)";
    ctx.beginPath();
    ctx.moveTo(748, 46);
    ctx.lineTo(748, 175);
    ctx.lineTo(565, 175);
    ctx.lineTo(464, 88);
    ctx.quadraticCurveTo(520, 55, 590, 45);
    ctx.lineTo(590, 46);
    ctx.fill();
    ctx.stroke();

    // 2p left bottom
    ctx.fillStyle = "rgb(92, 4, 165, 0.15)";
    ctx.beginPath();
    ctx.moveTo(748, 756);
    ctx.lineTo(748, 625);
    ctx.lineTo(565, 625);
    ctx.lineTo(464, 712);
    ctx.quadraticCurveTo(520, 745, 590, 755);
    ctx.lineTo(590, 756);
    ctx.fill();
    ctx.stroke();

    // 2p right top
    ctx.fillStyle = "rgb(140, 255, 0, 0.15)";
    ctx.beginPath();
    ctx.moveTo(565, 175);
    ctx.lineTo(464, 88);
    ctx.quadraticCurveTo(355, 163, 317, 290);
    ctx.lineTo(450, 323);
    ctx.quadraticCurveTo(470, 220, 570, 175);
    ctx.fill();
    ctx.stroke();

    // 2p left top
    ctx.fillStyle = "rgb(140, 255, 0, 0.15)";
    ctx.beginPath();
    ctx.moveTo(565, 625);
    ctx.lineTo(464, 712);
    ctx.quadraticCurveTo(355, 637, 317, 510);
    ctx.lineTo(450, 477);
    ctx.quadraticCurveTo(470, 580, 570, 625);
    ctx.fill();
    ctx.stroke();

    // 2p middle top
    ctx.fillStyle = "rgb(92, 4, 165, 0.15)";
    ctx.beginPath();
    ctx.moveTo(317, 290);
    ctx.quadraticCurveTo(285, 390, 317, 510);
    ctx.lineTo(450, 477);
    ctx.lineTo(450, 323);
    ctx.fill();
    ctx.stroke();

    // close right
    ctx.fillStyle = "rgb(255, 255, 0, 0.15)";
    ctx.beginPath();
    ctx.moveTo(748, 175);
    ctx.lineTo(748, 332);
    ctx.lineTo(655, 332);
    ctx.quadraticCurveTo(630, 335, 615, 350);
    ctx.lineTo(490, 240);
    ctx.quadraticCurveTo(500, 215, 565, 175);
    ctx.fill();
    ctx.stroke();

    // close left
    ctx.fillStyle = "rgb(255, 255, 0, 0.15)";
    ctx.beginPath();
    ctx.moveTo(748, 625);
    ctx.lineTo(748, 468);
    ctx.lineTo(655, 468);
    ctx.quadraticCurveTo(630, 465, 615, 450);
    ctx.lineTo(488, 562);
    ctx.quadraticCurveTo(500, 585, 565, 625);
    ctx.fill();
    ctx.stroke();

    // close top
    ctx.fillStyle = "rgb(140, 255, 0, 0.15)";
    ctx.beginPath();
    ctx.moveTo(490, 235);
    ctx.quadraticCurveTo(460, 270, 450, 323);
    ctx.lineTo(450, 477);
    ctx.quadraticCurveTo(460, 525, 488, 562);
    ctx.lineTo(615, 450);
    ctx.bezierCurveTo(585, 425, 585, 375, 615, 350);
    ctx.fill();
    ctx.stroke();

    // center
    ctx.fillStyle = "rgb(255, 51, 51, 0.15)";
    ctx.beginPath();
    ctx.moveTo(748, 332);
    ctx.lineTo(655, 332);
    ctx.bezierCurveTo(570, 340, 570, 460, 655, 468);
    ctx.lineTo(748, 468);
    ctx.fill();
    ctx.stroke();
  };

  return (
    <div className={styles.gamePlayerCanvasWrap}>
      <canvas ref={canvasRef} className={styles.gamePlayerCanvas}></canvas>
    </div>
  );
}

export default PlayerCanvas;
