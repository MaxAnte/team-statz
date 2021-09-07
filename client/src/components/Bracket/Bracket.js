import React, { useState } from "react";

import BracketMatchup from "../BracketMatchup/BracketMatchup";

import styles from "./bracket.module.css";

function Bracket() {
  const [matchups, setMatchups] = useState([
    {
      team1: "Termits",
      team2: "Aidar",
      winner: "",
      t1Text: { x: 190, y: 120 },
      t2Text: { x: 200, y: 195 },
      t1Score: { x: 345, y: 120 },
      t2Score: { x: 345, y: 195 },
    },
    {
      team1: "Basketball City",
      team2: "Veterans",
      winner: "",
      t1Text: { x: 155, y: 470 },
      t2Text: { x: 185, y: 545 },
      t1Score: { x: 345, y: 470 },
      t2Score: { x: 345, y: 545 },
    },
    {
      team1: "Warriors Bros.",
      team2: "Superslonics",
      winner: "",
      t1Text: { x: 1285, y: 120 },
      t2Text: { x: 1295, y: 195 },
      t1Score: { x: 1225, y: 120 },
      t2Score: { x: 1225, y: 195 },
    },
    {
      team1: "Avangard",
      team2: "MSDUSHOR",
      winner: "",
      t1Text: { x: 1300, y: 470 },
      t2Text: { x: 1280, y: 545 },
      t1Score: { x: 1225, y: 470 },
      t2Score: { x: 1225, y: 545 },
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
        <polyline points="385,150 400,150 400,240" />
        <polyline points="385,500 400,500 400,390" />
        <polyline points="535,325 570,325" />
        <polyline points="1215,150 1200,150 1200,240" />
        <polyline points="1215,500 1200,500 1200,390" />
        <polyline points="1065,325 1030,325" />
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
        {matchups.slice(0, 2).map((matchup, index) => (
          <g
            key={index}
            id={`aMatch${index}`}
            transform={`translate(0,${350 * index})`}
          >
            <BracketMatchup info={matchup} />
          </g>
        ))}
      </g>
      <g transform="translate(-270,100)">
        {matchups.slice(2).map((matchup, index) => (
          <g
            key={index}
            id={`bMatch${index}`}
            transform={`translate(1500,${350 * index})`}
          >
            <BracketMatchup info={matchup} />
          </g>
        ))}
      </g>
    </svg>
  );
}

export default Bracket;
