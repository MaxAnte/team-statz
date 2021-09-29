import type { AppProvider } from "./app.provider";

export type Context = {
  settings: Settings;
  teams: Team[] | [];
  players: Player[] | [];
  games: Game[] | [];
  dates: DateType[] | [];
  playoffsmatchups: PlayoffsMatchup[] | [];
  birthDayPlayers: Player[] | [];
  loading: boolean;

  getSettings: InstanceType<typeof AppProvider>["getSettings"];
  saveSettings: InstanceType<typeof AppProvider>["saveSettings"];
  getTeams: InstanceType<typeof AppProvider>["getTeams"];
  editTeamInfo: InstanceType<typeof AppProvider>["editTeamInfo"];
  getPlayers: InstanceType<typeof AppProvider>["getPlayers"];
  getPlayerById: InstanceType<typeof AppProvider>["getPlayerById"];
  getBirthdayPlayers: InstanceType<typeof AppProvider>["getBirthdayPlayers"];
  getGames: InstanceType<typeof AppProvider>["getGames"];
  completeGame: InstanceType<typeof AppProvider>["completeGame"];
  editGame: InstanceType<typeof AppProvider>["editGame"];
  deleteGame: InstanceType<typeof AppProvider>["deleteGame"];
  getDates: InstanceType<typeof AppProvider>["getDates"];
  addDate: InstanceType<typeof AppProvider>["addDate"];
  getPlayoffsMatchups: InstanceType<typeof AppProvider>["getPlayoffsMatchups"];
  buildPlayoffsBracket: InstanceType<
    typeof AppProvider
  >["buildPlayoffsBracket"];
  clearPlayoffsBracket: InstanceType<
    typeof AppProvider
  >["clearPlayoffsBracket"];
};

export type Settings = {
  _id?: string;
  enableCalendarScrollMode: boolean;
  playoffsBracketBuilt: boolean;
  playoffsStart: string;
  __v?: number;
};

export type Team = {
  _id?: string;
  group: string;
  loses: number;
  name: string;
  points: number;
  winRate: number;
  wins: number;
  __v?: number;
};

export type Player = {
  _id: string;
  age: number;
  ast: number;
  bestInAst: boolean;
  bestInBlk: boolean;
  bestInPts: boolean;
  bestInReb: boolean;
  bestInStl: boolean;
  birthDate: string;
  blk: number;
  dreb: number;
  fouls: number;
  fta: number;
  ftm: number;
  gp: number;
  gs: number;
  image_thumb: string;
  mp: number;
  name: string;
  number: number;
  oreb: number;
  plus_minus: number;
  position: string;
  pts: number;
  reb: number;
  stl: number;
  three_pa: number;
  three_pm: number;
  tov: number;
  two_pa: number;
  two_pm: number;
  check?: boolean;
  __v?: number;
};

export type CoordBase = {
  x: number;
  y: number;
};

export type Coord = {
  _id?: string;
  x: number;
  y: number;
  miss: boolean;
  __v?: number;
};

export type PlayerStats = {
  _id: string;
  ast: number;
  blk: number;
  coordinates: Coord[];
  dreb: number;
  fouls: number;
  fta: number;
  ftm: number;
  minutes: number;
  oreb: number;
  plus_minus: number;
  pts: number;
  stl: number;
  three_pa: number;
  three_pm: number;
  tov: number;
  two_pa: number;
  two_pm: number;
  __v?: number;
};

export type PlayerOverallStats = {
  ast: number;
  blk: number;
  dreb: number;
  fouls: number;
  fta: number;
  ftm: number;
  minutes: number;
  oreb: number;
  plus_minus: number;
  pts: number;
  stl: number;
  three_pa: number;
  three_pm: number;
  tov: number;
  two_pa: number;
  two_pm: number;
  __v?: number;
};

export type Quarter = {
  _id?: string;
  enemy: number;
  our: number;
};

export type Game = {
  _id: string;
  date: string;
  enemy: string;
  enemyScore: number;
  ourScore: number;
  pending: boolean;
  playersStats: PlayerStats[];
  quarters: Quarter[];
  time: string;
  __v?: number;
};

export type DateType = {
  _id?: string;
  date: string;
  enemy: string;
  enemyScore?: number;
  ourScore?: number;
  time: string;
  __v?: number;
};

export type PlayoffsMatchup = {
  _id: string;
  team1: string;
  team2: string;
  winner: string;
  __v?: number;
};

export type Props = {
  // children: React.ReactChild;
};

export type State = {
  context: Context;
};
