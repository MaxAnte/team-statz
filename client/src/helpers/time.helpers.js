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
