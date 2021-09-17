import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/app.provider.tsx";

import BracketMatchup from "../BracketMatchup/bracketMatchup.tsx";

import styles from "./bracket.module.css";

function Bracket() {
  const { getPlayoffsMatchups, playoffsmatchups } = useContext(AppContext);
  useEffect(() => getPlayoffsMatchups(), []);
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
          <text transform="translate(805, 260)">FINAL</text>
        </g>
      </g>

      <g transform="translate(120,100)">
        <g id={`aMatch-1`}>
          <BracketMatchup info={playoffsmatchups[0]} scoreAlign="right" />
        </g>
        <g id={`aMatch-2`} transform={`translate(0,350)`}>
          <BracketMatchup info={playoffsmatchups[1]} scoreAlign="right" />
        </g>
      </g>

      <g transform="translate(1230,100)">
        <g id={`bMatch-1`}>
          <BracketMatchup info={playoffsmatchups[2]} scoreAlign="left" />
        </g>
        <g id={`bMatch-2`} transform={`translate(0,350)`}>
          <BracketMatchup info={playoffsmatchups[3]} scoreAlign="left" />
        </g>
      </g>

      <g transform="translate(270,275)">
        <g id={`aSemis`}>
          <BracketMatchup info={playoffsmatchups[4]} scoreAlign="right" />
        </g>
      </g>
      <g transform="translate(1090,275)">
        <g id={`bSemis`}>
          <BracketMatchup info={playoffsmatchups[5]} scoreAlign="left" />
        </g>
      </g>
      <g transform="translate(580,275)">
        <g id={`finals`}>
          <BracketMatchup
            info={playoffsmatchups[6]}
            scoreAlign="center"
            finals
          />
        </g>
      </g>
    </svg>
  );
}

export default Bracket;
