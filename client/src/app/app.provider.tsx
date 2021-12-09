/* eslint-disable no-invalid-this */
import React, { createContext } from "react";

import { createCurrentSeasonYears } from "../helpers/time.helpers";

import {
  Context,
  DateType,
  Game,
  Player,
  PlayoffsMatchup,
  Props,
  Season,
  Settings,
  State,
  Team,
} from "./app.types";

import { api } from "../api/api";
import {
  DateSchema,
  DatesSchema,
  GameSchema,
  GamesSchema,
  NewGameSchema,
  PlayerSchema,
  PlayersSchema,
  PlayoffsMatchupsSchema,
  SeasonSchema,
  SeasonsNamesSchema,
  SettingsSchema,
  TeamSchema,
  TeamsSchema,
} from "./app.schema";

export const AppContext = createContext<Context>(undefined!);
export class AppProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      context: {
        settings: {
          teamName: "Team Name",
          enableCalendarScrollMode: false,
          playoffsBracketBuilt: false,
          playoffsStart: "",
        },
        teams: [],
        players: [],
        games: [],
        dates: [],
        playoffsmatchups: [],
        birthDayPlayers: [],
        season: createCurrentSeasonYears(),

        getSettings: this.getSettings,
        saveSettings: this.saveSettings,
        getTeams: this.getTeams,
        editTeamInfo: this.editTeamInfo,
        getPlayers: this.getPlayers,
        getPlayerById: this.getPlayerById,
        getBirthdayPlayers: this.getBirthdayPlayers,
        getGames: this.getGames,
        completeGame: this.completeGame,
        editGame: this.editGame,
        deleteGame: this.deleteGame,
        getDates: this.getDates,
        addDate: this.addDate,
        getPlayoffsMatchups: this.getPlayoffsMatchups,
        buildPlayoffsBracket: this.buildPlayoffsBracket,
        clearPlayoffsBracket: this.clearPlayoffsBracket,
        setSeason: this.setSeason,
        getSeasons: this.getSeasons,
        loading: false,
      },
    };
  }

  getSettings = async () => {
    this.setState({
      context: {
        ...this.state.context,
        loading: true,
      },
    });
    try {
      const response = await api<Settings>("/api/settings", "POST", {});

      const settings = SettingsSchema.parse(response);

      setTimeout(() => {
        this.setState({
          context: {
            ...this.state.context,
            settings,
            loading: false,
          },
        });
      }, 800);

      return settings;
    } catch (error: any) {
      throw error;
    }
  };

  saveSettings = async (settings: Settings) => {
    try {
      SettingsSchema.parse(settings);
      await api<Settings>("/api/settings/save", "POST", { ...settings });
      this.getSettings();
    } catch (error: any) {
      throw error;
    }
  };

  getTeams = async () => {
    this.setState({
      context: {
        ...this.state.context,
        loading: true,
      },
    });
    try {
      const response = await api<Team[]>("/api/team/teams", "POST", {
        season: this.state.context.season,
      });

      const teams = TeamsSchema.parse(response);

      this.setState({
        context: {
          ...this.state.context,
          teams,
          loading: false,
        },
      });
      return teams;
    } catch (error: any) {
      throw error;
    }
  };

  editTeamInfo = async (team: Team) => {
    try {
      TeamSchema.parse(team);
      await api<Team>("/api/team/edit-table-info", "POST", {
        ...team,
        season: this.state.context.season,
      });
      this.getTeams();
    } catch (error: any) {
      throw error;
    }
  };

  getPlayers = async () => {
    this.setState({
      context: {
        ...this.state.context,
        loading: true,
      },
    });
    try {
      const response = await api<Player[]>("/api/player/players", "POST", {});

      const players = PlayersSchema.parse(response);

      if (players.length) {
        const bestPts = { pts: 0, id: "" };
        const bestReb = { reb: 0, id: "" };
        const bestAst = { ast: 0, id: "" };
        const bestBlk = { blk: 0, id: "" };
        const bestStl = { stl: 0, id: "" };
        players.forEach((el) => {
          if (el.pts > bestPts.pts) {
            bestPts.pts = el.pts;
            bestPts.id = el._id;
          }
          if (el.reb > bestReb.reb) {
            bestReb.reb = el.reb;
            bestReb.id = el._id;
          }
          if (el.ast > bestAst.ast) {
            bestAst.ast = el.ast;
            bestAst.id = el._id;
          }
          if (el.blk > bestBlk.blk) {
            bestBlk.blk = el.blk;
            bestBlk.id = el._id;
          }
          if (el.stl > bestStl.stl) {
            bestStl.stl = el.stl;
            bestStl.id = el._id;
          }
        });
        players.forEach((el) => {
          if (el._id === bestPts.id) el.bestInPts = true;
          if (el._id === bestReb.id) el.bestInReb = true;
          if (el._id === bestAst.id) el.bestInAst = true;
          if (el._id === bestBlk.id) el.bestInBlk = true;
          if (el._id === bestStl.id) el.bestInStl = true;
        });
      }
      this.setState({
        context: {
          ...this.state.context,
          players,
          loading: false,
        },
      });
      return players;
    } catch (error: any) {
      throw error;
    }
  };

  getPlayerById = async (pId: string) => {
    try {
      const response = await api<Player>("/api/player/id", "POST", {
        _id: pId,
      });

      const player = PlayerSchema.parse(response);

      return player;
    } catch (error: any) {
      throw error;
    }
  };

  getBirthdayPlayers = async () => {
    try {
      const response = await api<Player[]>("/api/player/birthDay", "POST", {});

      const birthDayPlayers = PlayersSchema.parse(response);

      this.setState({
        context: {
          ...this.state.context,
          birthDayPlayers,
          loading: true,
        },
      });
      return birthDayPlayers;
    } catch (error: any) {
      throw error;
    }
  };

  getGames = async () => {
    this.setState({
      context: {
        ...this.state.context,
        loading: true,
      },
    });
    try {
      const response = await api<Game[]>("/api/game/games", "POST", {});

      const games = GamesSchema.parse(response);

      this.setState({
        context: {
          ...this.state.context,
          games,
          loading: false,
        },
      });
      return games;
    } catch (error: any) {
      throw error;
    }
  };

  completeGame = async (game: Partial<Game>) => {
    try {
      NewGameSchema.parse(game);
      await api<string>("/api/game/complete-game", "POST", {
        ...game,
      });
      this.getGames();
    } catch (error: any) {
      throw error;
    }
  };

  editGame = async (game: Partial<Game>) => {
    try {
      GameSchema.parse(game);
      await api<string>("/api/game/edit-game", "POST", {
        ...game,
      });
      this.getGames();
    } catch (error: any) {
      throw error;
    }
  };

  deleteGame = async (gameID: string) => {
    try {
      await api<string>("/api/game/delete-game", "POST", {
        _id: gameID,
      });
      this.getGames();
    } catch (error: any) {
      throw error;
    }
  };

  getDates = async () => {
    this.setState({
      context: {
        ...this.state.context,
        loading: true,
      },
    });
    try {
      const response = await api<DateType[]>("/api/date/dates", "POST", {});

      const dates = DatesSchema.parse(response);

      this.setState({
        context: {
          ...this.state.context,
          dates,
          loading: false,
        },
      });
      return dates;
    } catch (error: any) {
      throw error;
    }
  };

  addDate = async (date: DateType) => {
    try {
      DateSchema.parse(date);
      await api<string>("/api/date/add-date", "POST", { ...date });
      this.getDates();
    } catch (error: any) {
      throw error;
    }
  };

  getPlayoffsMatchups = async () => {
    this.setState({
      context: {
        ...this.state.context,
        loading: true,
      },
    });
    try {
      const response = await api<PlayoffsMatchup[]>(
        "/api/bracket/get",
        "POST",
        {}
      );

      const playoffsmatchups = PlayoffsMatchupsSchema.parse(response);

      this.setState({
        context: {
          ...this.state.context,
          playoffsmatchups,
          loading: true,
        },
      });
      return playoffsmatchups;
    } catch (error: any) {
      throw error;
    }
  };

  buildPlayoffsBracket = async () => {
    try {
      await api<string>("/api/bracket/build", "POST", {});
      this.getSettings();
    } catch (error: any) {
      throw error;
    }
  };

  clearPlayoffsBracket = async () => {
    try {
      await api<string>("/api/bracket/clear", "POST", {});
      this.getSettings();
    } catch (error: any) {
      throw error;
    }
  };

  getSeasons = async () => {
    try {
      const response = await api<string[]>("/api/seasons");
      const seasons = SeasonsNamesSchema.parse(response);
      return seasons;
    } catch (error: any) {
      throw error;
    }
  };

  setSeason = (season: string) => {
    this.setState({
      context: {
        ...this.state.context,
        season,
      },
    });
    return season;
  };

  componentDidMount() {
    this.getSettings();
  }

  render() {
    return (
      <AppContext.Provider value={this.state.context}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
