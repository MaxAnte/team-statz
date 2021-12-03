import React from "react";

import type { Props } from "./icon.types";

import styles from "./icon.module.css";

export default function SubstitutionArrowIcon({
  width,
  height,
  color = "black",
  className = "",
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      className={`${styles[color]} ${className}`}
    >
      <path
        fillRule="evenodd"
        d="M26,38V18l5,5,3-3L24,10,14,20l3,3,5-5V38h4Z"
      />
      <rect fillRule="evenodd" height="8" width="4" x="22" y="30" />
    </svg>
  );
}
