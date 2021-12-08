import { parseToFixedWithoutZero } from "./number.helpers";

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const checkDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const christmas = new Date(`${year} December 17`);
  const endChristmas = new Date(`${year + 1} January 10`);
  if (now >= christmas && now <= endChristmas) return "christmas";
  return "baseBg";
};

export const parseSubTime = (timeStr: string) => {
  if (timeStr.includes(":")) return timeStr;
  switch (timeStr.length) {
    case 4:
      return `${timeStr.slice(0, 2)}:${timeStr.slice(-2)}`;

    default:
      return `${timeStr.padStart(3, "0").slice(0, 1)}:${timeStr
        .padStart(3, "0")
        .slice(-2)}`;
  }
};

export const parseToPureMinutes = (timeStr: string): number => {
  const [m, s] = timeStr.split(":");
  return Number(m) + Number(s) / 60;
};

export const parsePlayingMinutes = (
  minutes: string[],
  isStarter: boolean
): number => {
  let tmp = 0;
  const minArr = ["0:00", ...minutes];

  return parseToFixedWithoutZero(
    minArr
      .map((min) => parseToPureMinutes(min))
      .reduce((acc, cur, i) => {
        const decider = isStarter ? 0 : 1;
        if (i % 2 === decider) {
          tmp = cur;
          return (acc += 0);
        }
        return (acc += cur - tmp);
      })
  );
};
