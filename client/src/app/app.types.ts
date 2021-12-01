import { z } from "zod";
import type { AppProvider } from "./app.provider";
import {
  DateSchema,
  GameSchema,
  PlayerSchema,
  PlayoffsMatchupSchema,
  quarterSchema,
  SettingsSchema,
  TeamSchema,
} from "./app.schema";

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

export type Settings = z.infer<typeof SettingsSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type Player = z.infer<typeof PlayerSchema>;

export type CoordBase = {
  x: number;
  y: number;
};

export type Coord = CoordBase & {
  _id?: string;
  miss: boolean;
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

export type PlayerStats = PlayerOverallStats & {
  _id: string;
  coordinates: Coord[];
};

export type Quarter = z.infer<typeof quarterSchema>;
export type Game = z.infer<typeof GameSchema>;
export type DateType = z.infer<typeof DateSchema>;
export type PlayoffsMatchup = z.infer<typeof PlayoffsMatchupSchema>;

export type Props = {
  // children: React.ReactChild;
};

export type State = {
  context: Context;
};
