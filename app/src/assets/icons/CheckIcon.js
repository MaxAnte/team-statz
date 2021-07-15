import React from "react";

import styles from "./icon.module.css";

function CheckIcon({ width, heigth, color = "black", className = "" }) {
  return (
    <svg
      enableBackground="new 0 0 515.556 515.556"
      viewBox="0 0 515.556 515.556"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={heigth}
      className={`${styles[color]} ${className}`}
    >
      <path d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z" />
    </svg>
  );
}

export default CheckIcon;