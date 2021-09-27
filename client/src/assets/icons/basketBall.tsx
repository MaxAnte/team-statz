// source: https://loading.io/spinner/basketball/-ball-basketball-nba-dribbble-round-rotate
import React from "react";

import type { Props } from "./icon.types";

import styles from "./icon.module.css";

export default function BasketBallIcon({
  width,
  height,
  color = "black",
  className = "",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className={`${styles[color]} ${className}`}
    >
      <circle
        cx="50"
        cy="50"
        r="40.25"
        fill="#ffffff"
        stroke="#31ad31"
        strokeWidth="4.5"
      ></circle>
      <path d="M50 10L50 90" stroke="#31ad31" strokeWidth="4"></path>
      <path
        d="M21.715728752538098 21.7157287525381 A40 40 0 0 1 21.715728752538098 78.2842712474619"
        fill="none"
        stroke="#31ad31"
        strokeWidth="4"
      ></path>
      <path
        d="M78.2842712474619 21.7157287525381 A40 40 0 0 0 78.2842712474619 78.2842712474619"
        fill="none"
        stroke="#31ad31"
        strokeWidth="4"
      ></path>
      <g transform="translate(0 50)">
        <g>
          <path
            d="M10 0A40 40 0 0 1 90 0"
            fill="none"
            stroke="#31ad31"
            strokeWidth="4"
          >
            <animate
              attributeName="d"
              repeatCount="indefinite"
              dur="1.0526315789473684s"
              calcMode="spline"
              keyTimes="0;0.499999;0.5;1"
              keySplines="0.1 0 1 0.9;0.5 0.5 0.5 0.5;0 0.1 0.9 1"
              values="M10 0A40 40 0 0 1 90 0;M10 0A40 0 0 0 1 90 0;M10 0A40 0 0 0 0 90 0;M10 0A40 40 0 0 0 90 0"
              begin="0"
            ></animate>
          </path>
          <path
            d="M10 0A40 40 0 0 1 90 0"
            fill="none"
            stroke="#31ad31"
            strokeWidth="4"
          >
            <animate
              attributeName="d"
              repeatCount="indefinite"
              dur="1.0526315789473684s"
              calcMode="spline"
              keyTimes="0;0.499999;0.5;1"
              keySplines="0.1 0 1 0.9;0.5 0.5 0.5 0.5;0 0.1 0.9 1"
              values="M10 0A40 40 0 0 1 90 0;M10 0A40 0 0 0 1 90 0;M10 0A40 0 0 0 0 90 0;M10 0A40 40 0 0 0 90 0"
              begin="-0.5263157894736842"
            ></animate>
          </path>
        </g>
      </g>
    </svg>
  );
}
