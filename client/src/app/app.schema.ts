import { z } from "zod";

export const SettingsSchema = z.object({
  _id: z.string().optional(),
  teamName: z.string(),
  teamLogo: z.string().optional(),
  enableCalendarScrollMode: z.boolean(),
  playoffsBracketBuilt: z.boolean(),
  playoffsStart: z.string(),
  __v: z.number().optional(),
});

export const TeamSchema = z.object({
  _id: z.string().optional(),
  group: z.string(),
  loses: z.number(),
  name: z.string(),
  points: z.number(),
  winRate: z.number(),
  wins: z.number(),
  __v: z.number().optional(),
});

export const TeamsSchema = z.array(TeamSchema);

export const PlayerSchema = z.object({
  _id: z.string(),
  age: z.number(),
  ast: z.number(),
  bestInAst: z.boolean(),
  bestInBlk: z.boolean(),
  bestInPts: z.boolean(),
  bestInReb: z.boolean(),
  bestInStl: z.boolean(),
  birthDate: z.string(),
  blk: z.number(),
  dreb: z.number(),
  fouls: z.number(),
  fta: z.number(),
  ftm: z.number(),
  gp: z.number(),
  gs: z.number(),
  image_thumb: z.string(),
  mp: z.number(),
  name: z.string(),
  number: z.number(),
  oreb: z.number(),
  plus_minus: z.number(),
  position: z.string(),
  pts: z.number(),
  reb: z.number(),
  stl: z.number(),
  three_pa: z.number(),
  three_pm: z.number(),
  tov: z.number(),
  two_pa: z.number(),
  two_pm: z.number(),
  check: z.boolean().optional(),
  __v: z.number().optional(),
});

export const PlayersSchema = z.array(PlayerSchema);

export const CoordinatesSchema = z.array(
  z.object({
    _id: z.string().optional(),
    x: z.number(),
    y: z.number(),
    miss: z.boolean(),
    __v: z.number().optional(),
  })
);

export const PlayerStatsSchema = z.object({
  _id: z.string(),
  gs: z.boolean(),
  ast: z.number(),
  blk: z.number(),
  coordinates: CoordinatesSchema,
  dreb: z.number(),
  fouls: z.number(),
  fta: z.number(),
  ftm: z.number(),
  minutes: z.string().array(),
  oreb: z.number(),
  plus_minus: z.number(),
  pts: z.number(),
  stl: z.number(),
  three_pa: z.number(),
  three_pm: z.number(),
  tov: z.number(),
  two_pa: z.number(),
  two_pm: z.number(),
  __v: z.number().optional(),
});

export const quarterSchema = z.object({
  _id: z.string().optional(),
  enemy: z.number(),
  our: z.number(),
});

export const quartersSchema = z.array(quarterSchema);

export const GameSchema = z.object({
  _id: z.string(),
  date: z.string(),
  enemy: z.string(),
  enemyScore: z.number(),
  ourScore: z.number(),
  pending: z.boolean(),
  playersStats: z.array(PlayerStatsSchema),
  quarters: quartersSchema,
  time: z.string(),
  __v: z.number().optional(),
});

export const NewGameSchema = z.object({
  date: z.string(),
  enemy: z.string(),
  enemyScore: z.number(),
  ourScore: z.number(),
  playersStats: z.array(PlayerStatsSchema),
  quarters: quartersSchema,
  time: z.string(),
  __v: z.number().optional(),
});

export const GamesSchema = z.array(GameSchema);

export const DateSchema = z.object({
  _id: z.string().optional(),
  date: z.string(),
  enemy: z.string(),
  enemyScore: z.number().optional(),
  ourScore: z.number().optional(),
  time: z.string(),
  __v: z.number().optional(),
});

export const DatesSchema = z.array(DateSchema);

export const PlayoffsMatchupSchema = z.object({
  _id: z.string(),
  team1: z.string(),
  team2: z.string(),
  winner: z.string(),
  __v: z.number().optional(),
});

export const PlayoffsMatchupsSchema = z.array(PlayoffsMatchupSchema);
