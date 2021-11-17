import { Coord, CoordBase } from "../context/app.types";

export const DEFAULT_WIDTH = 290;
export const DEFAULT_HEIGHT = 310;
export const MULTIPLIER_PLAYER: number = 1.289655172;
export const MULTIPLIER_STATS: number = 2.41379310345;

export const COLORS_STATS: string[] = [
  "#FF0032",
  "#F700FF",
  "#8000FF",
  "#469990",
  "#008FFF",
  "#00FF83",
  "#F0FF00",
  "#FFA600",
  "#FF5900",
  "#bfef45",
  "#42d4f4",
  "#ffd8b1",
  "#fffac8",
  "#aaffc3",
  "#ffffff",
];

// remember about that canvas is rotated in css
const three_l_b = new Path2D(
  "M 748 800 L 363 800 L 464 710 Q 520 743 587 755 L 748 755 Z"
);
const three_l_t = new Path2D(
  "M 0 800 L 363 800 L 464 710 Q 357 643 317 512 L 0 592 Z"
);
const three_m_t = new Path2D("M 0 208 L 317 288 Q 286 400 317 512 L 0 592 Z");
const three_r_t = new Path2D(
  "M 0 0 L 363 0 L 464 90 Q 357 157 317 288 L 0 208 Z"
);
const three_r_b = new Path2D(
  "M 748 0 L 363 0 L 464 90 Q 520 57 587 45 L 748 45 Z"
);
const two_l_b = new Path2D(
  "M 748 756 L 748 625 L 565 625 L 464 710 Q 520 743 587 755 L 590 755 Z"
);
const two_l_t = new Path2D(
  "M 565 625 L 464 710 Q 357 643 317 512 L 439 480 Q 475 580 565 625 Z"
);
const two_m_t = new Path2D("M 317 288 Q 286 400 317 512 L 439 480 L 439 320 Z");
const two_r_t = new Path2D(
  "M 565 175 L 464 90 Q 357 157 317 288 L 439 320 Q 475 220 565 175 Z"
);
const two_r_b = new Path2D(
  "M 748 45 L 748 176 L 565 175 L 464 90 Q 520 57 587 45 L 590 46 Z"
);
const close_l = new Path2D(
  "M 748 625 L 748 468 L 655 468 Q 630 465 615 450 L 488 562 Q 500 585 565 625 Z"
);
const close_t = new Path2D(
  "M 488 238 Q 455 270 439 320 L 439 480 Q 455 525 488 562 L 615 450 C 586 420 586 380 615 350 Z"
);
const close_r = new Path2D(
  "M 748 175 L 748 332 L 655 332 Q 630 335 615 350 L 488 238 Q 500 215 565 175 Z"
);
const center = new Path2D(
  "M 748 332 L 650 332 C 575 348 575 452 652 468 L 748 465 Z"
);

export const zones = [
  { path: three_l_b, tPoint: { x: 450, y: 790 } },
  { path: three_l_t, tPoint: { x: 170, y: 680 } },
  { path: three_m_t, tPoint: { x: 130, y: 420 } },
  { path: three_r_t, tPoint: { x: 180, y: 130 } },
  { path: three_r_b, tPoint: { x: 450, y: 40 } },
  { path: two_l_b, tPoint: { x: 600, y: 705 } },
  { path: two_l_t, tPoint: { x: 415, y: 610 } },
  { path: two_m_t, tPoint: { x: 320, y: 420 } },
  { path: two_r_t, tPoint: { x: 420, y: 215 } },
  { path: two_r_b, tPoint: { x: 600, y: 125 } },
  { path: close_l, tPoint: { x: 600, y: 590 } },
  { path: close_t, tPoint: { x: 480, y: 420 } },
  { path: close_r, tPoint: { x: 600, y: 235 } },
  { path: center, tPoint: { x: 620, y: 415 } },
];

export const drawCourt = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  multiplier: number = 1,
  lineWidth: number = 5
) => {
  const courtPaths = [
    new Path2D(
      `M 0 ${height / 2 - 75 * multiplier}
       C ${95 * multiplier} ${height / 2 - 65 * multiplier} 
         ${95 * multiplier} ${height / 2 + 65 * multiplier} 
         0 ${height / 2 + 75 * multiplier}`
    ), //centerCircle
    new Path2D(
      `M ${width} ${35 * multiplier}
       L ${width - 125 * multiplier} ${35 * multiplier}
       C ${width - 420 * multiplier} ${height / 2 - 225 * multiplier} 
         ${width - 420 * multiplier} ${height / 2 + 225 * multiplier} 
         ${width - 125 * multiplier} ${height - 35 * multiplier}
       L ${width} ${height - 35 * multiplier}`
    ), //threePointLine
    new Path2D(`
      M ${width / 2 + 50 * multiplier} ${height / 2 - 75 * multiplier}
      C ${width / 2 - 50 * multiplier} ${height / 2 - 65 * multiplier} 
        ${width / 2 - 50 * multiplier} ${height / 2 + 65 * multiplier} 
        ${width / 2 + 50 * multiplier} ${height / 2 + 75 * multiplier}  
      Q ${width / 2 + 73 * multiplier} ${height / 2 + 72 * multiplier} 
        ${width / 2 + 80 * multiplier} ${height / 2 + 67 * multiplier}
      M ${width / 2 + 90 * multiplier} ${height / 2 + 62 * multiplier}
      Q ${width / 2 + 102 * multiplier} ${height / 2 + 55 * multiplier} 
        ${width / 2 + 110 * multiplier} ${height / 2 + 44 * multiplier}
      M ${width / 2 + 117 * multiplier} ${height / 2 + 33 * multiplier}
      Q ${width / 2 + 123 * multiplier} ${height / 2 + 22 * multiplier} 
        ${width / 2 + 125 * multiplier} ${height / 2 + 7 * multiplier}
      M ${width / 2 + 125 * multiplier} ${height / 2 - 7 * multiplier}
      Q ${width / 2 + 123 * multiplier} ${height / 2 - 22 * multiplier}
        ${width / 2 + 117 * multiplier} ${height / 2 - 33 * multiplier}
      M ${width / 2 + 110 * multiplier} ${height / 2 - 44 * multiplier}
      Q ${width / 2 + 102 * multiplier} ${height / 2 - 55 * multiplier} 
        ${width / 2 + 90 * multiplier} ${height / 2 - 62 * multiplier}
      M ${width / 2 + 80 * multiplier} ${height / 2 - 67 * multiplier}
      Q ${width / 2 + 73 * multiplier} ${height / 2 - 72 * multiplier} 
        ${width / 2 + 50 * multiplier} ${height / 2 - 75 * multiplier}
    `), //paintCirlce
    new Path2D(`
      M ${width} ${height / 2 - 98 * multiplier} 
      L ${width - 240 * multiplier} ${height / 2 - 98 * multiplier}
      L ${width - 240 * multiplier} ${height / 2 + 98 * multiplier}
      L ${width} ${height / 2 + 98 * multiplier} 
    `), //paintRectangle
    new Path2D(`
      M ${width - 45 * multiplier} ${height / 2 - 53 * multiplier} 
      L ${width - 75 * multiplier} ${height / 2 - 53 * multiplier}
      C ${width - 135 * multiplier} ${height / 2 - 40 * multiplier} 
        ${width - 135 * multiplier} ${height / 2 + 40 * multiplier} 
        ${width - 75 * multiplier} ${height / 2 + 53 * multiplier}
      L ${width - 45 * multiplier} ${height / 2 + 53 * multiplier}
    `), //basketArc
    new Path2D(`
      M ${width - 45 * multiplier} ${height / 2 - 45 * multiplier} 
      L ${width - 45 * multiplier} ${height / 2 + 45 * multiplier} 
      M ${width - 45 * multiplier} ${(height / 2) * multiplier} 
      L ${width - 52 * multiplier} ${(height / 2) * multiplier} 
      a ${10 * multiplier}, ${10 * multiplier} 0 1, 0 ${-(20 * multiplier)}, 0
      a ${10 * multiplier}, ${10 * multiplier} 0 1, 0 ${20 * multiplier}, 0
    `), //basket
    new Path2D(`
      M ${width - 175 * multiplier} ${height / 2 - 100 * multiplier} 
      L ${width - 175 * multiplier} ${height / 2 - 110 * multiplier} 
      M ${width - 132 * multiplier} ${height / 2 - 100 * multiplier} 
      L ${width - 132 * multiplier} ${height / 2 - 110 * multiplier} 
      M ${width - 90 * multiplier} ${height / 2 - 100 * multiplier} 
      L ${width - 90 * multiplier} ${height / 2 - 110 * multiplier} 
      M ${width - 80 * multiplier} ${height / 2 - 100 * multiplier} 
      L ${width - 80 * multiplier} ${height / 2 - 110 * multiplier} 
      M ${width - 175 * multiplier} ${height / 2 + 100 * multiplier} 
      L ${width - 175 * multiplier} ${height / 2 + 110 * multiplier} 
      M ${width - 132 * multiplier} ${height / 2 + 100 * multiplier} 
      L ${width - 132 * multiplier} ${height / 2 + 110 * multiplier} 
      M ${width - 90 * multiplier} ${height / 2 + 100 * multiplier} 
      L ${width - 90 * multiplier} ${height / 2 + 110 * multiplier} 
      M ${width - 80 * multiplier} ${height / 2 + 100 * multiplier} 
      L ${width - 80 * multiplier} ${height / 2 + 110 * multiplier} 
    `), //helpingMarks
  ];

  ctx.lineWidth = lineWidth;
  courtPaths.forEach((path) => {
    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.stroke(path);
  });
};

export const drawMiss = (
  ctx: CanvasRenderingContext2D,
  element: CoordBase | Coord,
  offset: number = 0,
  multiplier: number = 1
) => {
  ctx.moveTo(element.x * multiplier - offset, element.y * multiplier - offset);
  ctx.lineTo(element.x * multiplier + offset, element.y * multiplier + offset);
  ctx.moveTo(element.x * multiplier + offset, element.y * multiplier - offset);
  ctx.lineTo(element.x * multiplier - offset, element.y * multiplier + offset);
};

export const drawMade = (
  ctx: CanvasRenderingContext2D,
  element: CoordBase | Coord,
  offset: number = 0,
  multiplier: number = 1
) =>
  ctx.arc(
    element.x * multiplier,
    element.y * multiplier,
    offset,
    0,
    2 * Math.PI
  );
