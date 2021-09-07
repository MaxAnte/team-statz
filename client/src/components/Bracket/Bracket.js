import React, { useState } from "react";

import BracketMatchup from "../BracketMatchup/BracketMatchup";

import styles from "./bracket.module.css";

function Bracket() {
  const [matchups, setMatchups] = useState([
    {
      id: 1,
      team1: "Termits",
      team2: "Aidar",
      winner: "Termits",
    },
    {
      id: 2,
      team1: "Basketball City",
      team2: "Veterans",
      winner: "Basketball City",
    },
    {
      id: 3,
      team1: "Warriors Bros.",
      team2: "Superslonics",
      winner: "Warriors Bros.",
    },
    {
      id: 4,
      team1: "Avangard",
      team2: "MSDUSHOR",
      winner: "MSDUSHOR",
    },
    {
      id: 5,
      team1: "Termits",
      team2: "Basketball City",
      winner: "Basketball City",
    },
    {
      id: 6,
      team1: "Warriors Bros.",
      team2: "MSDUSHOR",
      winner: "Warriors Bros.",
    },
    {
      id: 7,
      team1: "Basketball City",
      team2: "Warriors Bros.",
      winner: "Basketball City",
    },
  ]);

  return (
    <svg viewBox="0 0 1580 660" className={styles.bracket}>
      <g
        id="connects"
        fill="none"
        stroke="var(--color-text-main)"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <polyline points="385,150 400,150 400,255" />
        <polyline points="385,500 400,500 400,395" />
        <polyline points="530,325 570,325" />
        <polyline points="1215,150 1200,150 1200,255" />
        <polyline points="1215,500 1200,500 1200,395" />
        <polyline points="1040,325 1078,325" />
      </g>
      <g
        id="group-names"
        fill="var(--color-text-main)"
        fontFamily="var(--font-main)"
        fontSize="26px"
        fillOpacity="0.3"
      >
        <text textAnchor="start" transform="translate(120,25)">
          GROUP A
        </text>
        <text textAnchor="end" transform="translate(1500,25)">
          GROUP B
        </text>
      </g>
      <g
        id="bracket-labels"
        fill="var(--color-text-main)"
        fontFamily="var(--font-main)"
        fontSize="14px"
        fillOpacity="0.7"
      >
        <g textAnchor="start">
          <text transform="translate(120, 70)">QUARTER FINALS</text>
          <text transform="translate(415, 230)">SEMI FINALS</text>
        </g>
        <g textAnchor="end">
          <text transform="translate(1500, 70)">QUARTER FINALS</text>
          <text transform="translate(1185, 230)">SEMI FINALS</text>
        </g>
        <g textAnchor="middle">
          <text transform="translate(790, 260)">FINAL</text>
        </g>
      </g>

      <g transform="translate(120,100)">
        <g id={`aMatch-1`}>
          <BracketMatchup info={matchups[0] || null} scoreAlign="right" />
        </g>
        <g id={`aMatch-2`} transform={`translate(0,350)`}>
          <BracketMatchup info={matchups[1] || null} scoreAlign="right" />
        </g>
      </g>

      <g transform="translate(1230,100)">
        <g id={`bMatch-1`}>
          <BracketMatchup info={matchups[2] || null} scoreAlign="left" />
        </g>
        <g id={`bMatch-2`} transform={`translate(0,350)`}>
          <BracketMatchup info={matchups[3] || null} scoreAlign="left" />
        </g>
      </g>

      <g transform="translate(270,275)">
        <g id={`aSemis`}>
          <BracketMatchup info={matchups[4] || null} scoreAlign="right" />
        </g>
      </g>
      <g transform="translate(1090,275)">
        <g id={`bSemis`}>
          <BracketMatchup info={matchups[5] || null} scoreAlign="left" />
        </g>
      </g>
      <g transform="translate(580,275)">
        <g id={`finals`}>
          <BracketMatchup
            info={matchups[6] || null}
            scoreAlign="center"
            finals
          />
        </g>
      </g>
    </svg>
  );
}

export default Bracket;
