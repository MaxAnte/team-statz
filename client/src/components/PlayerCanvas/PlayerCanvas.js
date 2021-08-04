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

    drawZones(ctx);
  }, []);

  const drawZones = (ctx) => {
    // 3pt left top
    ctx.fillStyle = "rgb(255, 255, 0, 0.15)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 0);
    ctx.lineTo(280, 300);
    ctx.quadraticCurveTo(140, 345, 80, 455);
    ctx.lineTo(0, 355);
    ctx.fill();
    ctx.stroke();

    // 3pt middle top
    ctx.fillStyle = "rgb(255, 51, 51, 0.15)";
    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(560, 0);
    ctx.lineTo(480, 300);
    ctx.quadraticCurveTo(390, 275, 280, 300);
    ctx.fill();
    ctx.stroke();

    // 3pt right top
    ctx.fillStyle = "rgb(255, 255, 0, 0.15)";
    ctx.beginPath();
    ctx.moveTo(760, 0);
    ctx.lineTo(560, 0);
    ctx.lineTo(480, 300);
    ctx.quadraticCurveTo(620, 345, 680, 455);
    ctx.lineTo(760, 355);
    ctx.fill();
    ctx.stroke();

    // 3pt left bottom
    ctx.fillStyle = "rgb(255, 51, 51, 0.15)";
    ctx.beginPath();
    ctx.moveTo(0, 355);
    ctx.lineTo(80, 455);
    ctx.quadraticCurveTo(50, 505, 43, 555);
    ctx.lineTo(43, 555);
    ctx.lineTo(43, 730);
    ctx.lineTo(0, 730);
    ctx.fill();
    ctx.stroke();

    // 3pt right bottom
    ctx.fillStyle = "rgb(255, 51, 51, 0.15)";
    ctx.beginPath();
    ctx.moveTo(760, 355);
    ctx.lineTo(680, 455);
    ctx.quadraticCurveTo(710, 505, 717, 555);
    ctx.lineTo(717, 555);
    ctx.lineTo(717, 730);
    ctx.lineTo(760, 730);
    ctx.fill();
    ctx.stroke();

    // 2p left bottom
    ctx.fillStyle = "rgb(92, 4, 165, 0.15)";
    ctx.beginPath();
    ctx.moveTo(45, 730);
    ctx.lineTo(175, 730);
    ctx.lineTo(175, 570);
    ctx.lineTo(80, 455);
    ctx.quadraticCurveTo(55, 490, 45, 560);
    ctx.lineTo(45, 560);
    ctx.fill();
    ctx.stroke();

    // 2p right bottom
    ctx.fillStyle = "rgb(92, 4, 165, 0.15)";
    ctx.beginPath();
    ctx.moveTo(715, 730);
    ctx.lineTo(585, 730);
    ctx.lineTo(585, 570);
    ctx.lineTo(680, 455);
    ctx.quadraticCurveTo(705, 490, 715, 560);
    ctx.lineTo(715, 560);
    ctx.fill();
    ctx.stroke();

    // 2p left top
    ctx.fillStyle = "rgb(140, 255, 0, 0.15)";
    ctx.beginPath();
    ctx.moveTo(175, 570);
    ctx.lineTo(80, 455);
    ctx.quadraticCurveTo(135, 350, 280, 300);
    ctx.lineTo(310, 416);
    ctx.quadraticCurveTo(205, 445, 175, 570);
    ctx.fill();
    ctx.stroke();

    // 2p right top
    ctx.fillStyle = "rgb(140, 255, 0, 0.15)";
    ctx.beginPath();
    ctx.moveTo(585, 570);
    ctx.lineTo(680, 455);
    ctx.quadraticCurveTo(625, 350, 480, 300);
    ctx.lineTo(450, 416);
    ctx.quadraticCurveTo(555, 445, 585, 570);
    ctx.fill();
    ctx.stroke();

    // 2p middle top
    ctx.fillStyle = "rgb(92, 4, 165, 0.15)";
    ctx.beginPath();
    ctx.moveTo(280, 300);
    ctx.quadraticCurveTo(380, 275, 480, 300);
    ctx.lineTo(450, 416);
    ctx.lineTo(310, 416);
    ctx.fill();
    ctx.stroke();

    // close left
    ctx.fillStyle = "rgb(255, 255, 0, 0.15)";
    ctx.beginPath();
    ctx.moveTo(175, 730);
    ctx.lineTo(316, 730);
    ctx.lineTo(316, 615);
    ctx.quadraticCurveTo(325, 590, 332, 585);
    ctx.lineTo(230, 465);
    ctx.quadraticCurveTo(195, 495, 175, 570);
    ctx.fill();
    ctx.stroke();

    // close right
    ctx.fillStyle = "rgb(255, 255, 0, 0.15)";
    ctx.beginPath();
    ctx.moveTo(585, 730);
    ctx.lineTo(444, 730);
    ctx.lineTo(444, 615);
    ctx.quadraticCurveTo(435, 590, 428, 585);
    ctx.lineTo(530, 465);
    ctx.quadraticCurveTo(568, 495, 585, 570);
    ctx.fill();
    ctx.stroke();

    // close top
    ctx.fillStyle = "rgb(140, 255, 0, 0.15)";
    ctx.beginPath();
    ctx.moveTo(230, 465);
    ctx.quadraticCurveTo(260, 425, 310, 416);
    ctx.lineTo(450, 416);
    ctx.quadraticCurveTo(500, 425, 530, 465);
    ctx.lineTo(428, 585);
    ctx.bezierCurveTo(409, 557, 351, 557, 332, 585);
    ctx.fill();
    ctx.stroke();

    // center
    ctx.fillStyle = "rgb(255, 51, 51, 0.15)";
    ctx.beginPath();
    ctx.moveTo(316, 730);
    ctx.lineTo(316, 615);
    ctx.bezierCurveTo(335, 547, 425, 547, 446, 615);
    ctx.lineTo(446, 730);
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
