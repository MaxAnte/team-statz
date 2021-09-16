export type Context = {
  settings: Settings | null;
  teams: Team[] | null;
  players: Player[] | null;
  games: Game[] | null;
  dates: DateType[] | null;
  playoffsmatchups: PlayoffsMatchup[] | null;

  getSettings: () => void;
  saveSettings: () => Promise<
    | {
        __v?: number | undefined;
        _id: string;
        enableCalendarScrollMode: boolean;
        playoffsBracketBuilt: boolean;
        playoffsStart: string;
      }
    | undefined
  >;
  getTeams: getTeams;
  editTeamInfo: editTeamInfo;
  getPlayers: getPlayers;
  getGames: getGames;
  deleteGame: deleteGame;
  getDates: getDates;
  addDate: addDate;
  getPlayoffsMatchups: getPlayoffsMatchups;
  buildPlayoffsBracket: buildPlayoffsBracket;
  clearPlayoffsBracket: clearPlayoffsBracket;
  loading: false;
};

export type Settings = {
  _id: string;
  enableCalendarScrollMode: boolean;
  playoffsBracketBuilt: boolean;
  playoffsStart: string;
  __v?: number;
};

export type Team = {
  _id: string;
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
  __v?: number;
};

export type Coord = {
  _id: string;
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

export type Quarter = {
  _id: string;
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
