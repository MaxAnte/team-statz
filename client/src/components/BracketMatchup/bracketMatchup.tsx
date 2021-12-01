import React from "react";

import { PlayoffsMatchup } from "../../context/app.types";

import styles from "./bracketMatchup.module.css";

type Props = {
  info: PlayoffsMatchup;
  scoreAlign: string;
  finals?: boolean;
};

function BracketMatchup({ info, scoreAlign, finals = false }: Props) {
  const { team1, team2, winner = "" } = info || { team1: "TBD", team2: "TBD" };
  return (
    <svg
      // viewBox={`0 0 ${finals ? "450" : "250"} 100"`}
      width={`${finals ? "450" : "250"}`}
      height="100"
      className={styles.bracketMatchup}
    >
      <g>
        <path
          fill="var(--color-white)"
          d={`M 0 0 H ${finals ? "450" : "250"} V 100 H 0 V 0`}
         />
        <path
          fill="none"
          stroke="var(--color-text-main)"
          strokeWidth="2"
          d={`${
            scoreAlign === "center"
              ? `M 0 0 H 450 V 100 H 0 V 0 M 175 0 V 100 M 225 0 V 100 M 275 0 V 100`
              : `M 0 0 H 250 V 100 H 0 V 0 M ${
                  scoreAlign === "right" ? "210" : "40"
                } 0 V 100 M 0 50 H 250`
          }`}
         />
      </g>
      <g fontFamily="var(--font-main)" fontSize="18px" textAnchor="middle">
        <text
          fill={`${
            winner === team1 ? "var(--color-button)" : "var(--color-text-main)"
          }`}
          transform={`translate(${
            scoreAlign === "right"
              ? "230"
              : scoreAlign === "left"
              ? "20"
              : "200"
          },${finals ? "50" : "30"})`}
        >
          {winner === team1 ? "1" : "0"}
        </text>
        <text
          fill={`${
            winner === team2 ? "var(--color-button)" : "var(--color-text-main)"
          }`}
          transform={`translate(${
            scoreAlign === "right"
              ? "230"
              : scoreAlign === "left"
              ? "20"
              : "250"
          },${finals ? "50" : "80"})`}
        >
          {winner === team2 ? "1" : "0"}
        </text>
      </g>
      <g fontFamily="var(--font-main)" fontSize="18px" textAnchor="middle">
        <text
          fill={`${
            winner === team1 ? "var(--color-button)" : "var(--color-text-main)"
          }`}
          transform={`translate(${
            scoreAlign === "right"
              ? "105"
              : scoreAlign === "left"
              ? "145"
              : "87"
          },${finals ? "50" : "30"})`}
        >
          {team1}
        </text>
        <text
          fill={`${
            team2 && winner === team2
              ? "var(--color-button)"
              : "var(--color-text-main)"
          }`}
          transform={`translate(${
            scoreAlign === "right"
              ? "105"
              : scoreAlign === "left"
              ? "145"
              : "365"
          },${finals ? "50" : "80"})`}
        >
          {team2}
        </text>
      </g>
    </svg>
  );
}

export default BracketMatchup;
