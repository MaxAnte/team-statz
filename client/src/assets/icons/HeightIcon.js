import React from "react";

import styles from "./icon.module.css";

function HeightIcon({ width, heigth, color = "black", className = "" }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width}
      height={heigth}
      viewBox="0 0 512 512"
      className={`${styles[color]} ${className}`}
    >
      <g>
        <g>
          <polygon
            points="401,0 111,0 111,40 254.716,40 152.469,142.246 180.754,170.53 235,116.284 235,396.104 180.754,341.858 
			152.469,370.142 254.328,472 111,472 111,512 401,512 401,472 255.672,472 357.531,370.142 329.246,341.858 275,396.104 
			275,116.284 329.246,170.53 357.531,142.246 255.284,40 401,40 		"
          />
        </g>
      </g>
    </svg>
  );
}

export default HeightIcon;
