import React from "react";

import type { Props } from "./icon.types";

import styles from "./icon.module.css";

export default function CheckIcon({
  width,
  height,
  color = "black",
  className = "",
}: Props) {
  return (
    <svg
      enableBackground="new 0 0 515.556 515.556"
      viewBox="0 0 515.556 515.556"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={`${styles[color]} ${className}`}
    >
      <path d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z" />
    </svg>
  );
}
