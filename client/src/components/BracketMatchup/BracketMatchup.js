import React from "react";

import styles from "./bracketMatchup.module.css";

function BracketMatchup({ info }) {
  const { team1, team2, winner, t1Score, t2Score, t1Text, t2Text } = info;
  return (
    <svg
      viewBox="0 0 250 100"
      width="250"
      height="100"
      className={styles.bracketMatchup}
    >
      <g>
        <path fill="var(--color-white)" d="M 0 0 H 250 V 100 H 0 V 0"></path>
        <path
          fill="none"
          stroke="var(--color-text-main)"
          strokeWidth="2"
          d="M 0 0 H 250 V 100 H 0 V 0 M 40 0 V 100 M 0 50 H 250"
        ></path>
      </g>
      <g fontFamily="var(--font-main)" fontSize="12px" textAnchor="middle">
        <text
          fill={`${winner ? "var(--color-button)" : "var(--color-text-main)"}`}
          transform="translate(16,30)"
        >
          {winner === team1 ? "1" : "0"}
        </text>
        <text
          fill={`${winner ? "var(--color-button)" : "var(--color-text-main)"}`}
          transform="translate(16,80)"
        >
          {winner === team2 ? "1" : "0"}
        </text>
      </g>
      <g fontFamily="var(--font-main)" fontSize="12px" textAnchor="middle">
        <text
          fill={`${winner ? "var(--color-button)" : "var(--color-text-main)"}`}
          transform="translate(145,28)"
        >
          {team1}
        </text>
        <text
          fill={`${winner ? "var(--color-button)" : "var(--color-text-main)"}`}
          transform="translate(145,80)"
        >
          {team2}
        </text>
      </g>
    </svg>
  );
}

export default BracketMatchup;
