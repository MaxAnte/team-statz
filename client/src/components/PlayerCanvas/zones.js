// remember about that canvas is rotated in css
const three_l_b = new Path2D(
  "M 748 800 L 363 800 L 464 712 Q 520 745 590 756 L 748 756 Z"
);
const three_l_t = new Path2D(
  "M 0 800 L 363 800 L 464 712 Q 355 637 317 510 L 0 592 Z"
);
const three_m_t = new Path2D("M 0 208 L 317 290 Q 285 390 317 510 L 0 592 Z");
const three_r_t = new Path2D(
  "M 0 0 h 363 L 464 88 Q 355 163 317 290 L 0 208 Z"
);
const three_r_b = new Path2D(
  "M 748 0 L 363 0 L 464 88 Q 520 55 590 44 L 748 44 Z"
);
const two_l_b = new Path2D(
  "M 748 756 L 748 625 L 565 625 L 464 712 Q 520 745 590 755 L 590 756 Z"
);
const two_l_t = new Path2D(
  "M 565 625 L 464 712 Q 355 637 317 510 L 450 477 Q 470 580 570 625 Z"
);
const two_m_t = new Path2D("M 317 290 Q 285 390 317 510 L 450 477 L 450 323 Z");
const two_r_t = new Path2D(
  "M 565 175 L 464 88 Q 355 163 317 290 L 450 323 Q 470 220 570 175 Z"
);
const two_r_b = new Path2D(
  "M 748 46 L 748 175 L 565 175 L 464 88 Q 520 55 590 45 L 590 46 Z"
);
const close_l = new Path2D(
  "M 748 625 L 748 468 L 655 468 Q 630 465 615 450 L 488 562 Q 500 585 565 625 Z"
);
const close_t = new Path2D(
  "M 488 239 Q 460 270 450 323 L 450 477 Q 460 525 488 562 L 615 450 C 585 430 585 370 615 350 Z"
);
const close_r = new Path2D(
  "M 748 175 L 748 332 L 655 332 Q 630 335 615 350 L 488 239 Q 500 215 565 175 Z"
);
const center = new Path2D(
  "M 748 332 L 655 332 C 570 350 570 450 655 468 L 748 468 Z"
);

export const zones = [
  { path: three_l_b, tPoint: { x: 450, y: 780 } },
  { path: three_l_t, tPoint: { x: 170, y: 680 } },
  { path: three_m_t, tPoint: { x: 140, y: 400 } },
  { path: three_r_t, tPoint: { x: 180, y: 130 } },
  { path: three_r_b, tPoint: { x: 450, y: 50 } },
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
