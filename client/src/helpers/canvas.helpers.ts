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
      C ${width / 2 + 150 * multiplier} ${height / 2 - 65 * multiplier} 
        ${width / 2 + 150 * multiplier} ${height / 2 + 65 * multiplier} 
        ${width / 2 + 50 * multiplier} ${height / 2 + 75 * multiplier}
      C ${width / 2 - 50 * multiplier} ${height / 2 + 65 * multiplier} 
        ${width / 2 - 50 * multiplier} ${height / 2 - 65 * multiplier} 
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
