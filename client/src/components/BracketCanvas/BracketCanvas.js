import React, { useState, useEffect, useRef } from "react";

import { brackets } from "../PlayerCanvas/zones";

function BracketCanvas() {
  const [matchups, setMatchups] = useState([
    {
      team1: "Termits",
      team2: "Aidar",
      winner: "",
      t1Text: { x: 380, y: 240 },
      t2Text: { x: 400, y: 390 },
      t1Score: { x: 690, y: 240 },
      t2Score: { x: 690, y: 390 },
    },
    {
      team1: "Basketball City",
      team2: "Veterans",
      winner: "",
      t1Text: { x: 310, y: 940 },
      t2Text: { x: 370, y: 1090 },
      t1Score: { x: 690, y: 940 },
      t2Score: { x: 690, y: 1090 },
    },
    {
      team1: "Warriors Bros.",
      team2: "Superslonics",
      winner: "",
      t1Text: { x: 2570, y: 240 },
      t2Text: { x: 2590, y: 390 },
      t1Score: { x: 2450, y: 240 },
      t2Score: { x: 2450, y: 390 },
    },
    {
      team1: "Avangard",
      team2: "MSDUSHOR",
      winner: "",
      t1Text: { x: 2600, y: 940 },
      t2Text: { x: 2560, y: 1090 },
      t1Score: { x: 2450, y: 940 },
      t2Score: { x: 2450, y: 1090 },
    },
  ]);
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
    ctx.beginPath();
    ctx.fillStyle = "transparent";
    brackets.forEach((match) => {
      ctx.lineWidth = match.lineWidth;
      ctx.stroke(match.path);
      ctx.fill(match.path);
    });

    ctx.font = "48px serif";
    matchups.forEach((matchup) => {
      ctx.fillStyle = matchup.winner ? "#31ad31" : "#000000";
      ctx.fillText(matchup.team1, matchup.t1Text.x, matchup.t1Text.y);
      ctx.fillText(matchup.team2, matchup.t2Text.x, matchup.t2Text.y);
      ctx.fillText(
        matchup.winner ? "1" : "0",
        matchup.t1Score.x,
        matchup.t1Score.y
      );
      ctx.fillText(
        matchup.winner ? "1" : "0",
        matchup.t2Score.x,
        matchup.t2Score.y
      );
    });
  };

  return <canvas style={{ border: "1px solid #000" }} ref={canvasRef}></canvas>;
}

export default BracketCanvas;
