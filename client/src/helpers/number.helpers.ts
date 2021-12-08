export const parseToFixedWithoutZero = (n: number, fixed: number = 1): number =>
  parseFloat(n.toFixed(fixed));
