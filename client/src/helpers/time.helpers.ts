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

export const parsePlayingMinutes = (minutes: string[]): number =>
  minutes
    .map((min) => {
      const [m, s] = min.split(":");
      return Number(m) ? Number(m) + Number(s) / 60 : Number(s) / 60;
    })
    .reduce((acc, cur) => (acc += cur));
