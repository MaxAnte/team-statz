import React, { useState, useCallback, useEffect, createContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { Context, DateType, Game, Settings, Team } from "./app.types";
import {
  SettingsSchema,
  TeamsSchema,
  TeamSchema,
  PlayersSchema,
  GamesSchema,
  DatesSchema,
  DateSchema,
  PlayoffsMatchupsSchema,
  PlayerSchema,
  GameSchema,
  NewGameSchema,
} from "./app.schema";

type Props = {
  children: React.ReactChild;
};

export const AppContext = createContext<Context>(undefined!);

export const AppProvider = ({ children }: Props) => {
  const message = useMessage();
  const { request, clearError } = useHttp();

  const getSettings = useCallback(async () => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      loading: true,
    }));
    try {
      const response = await request("/api/settings", "POST", {});

      const settings = SettingsSchema.parse(response);

      setAppState((prevAppState) => ({
        ...prevAppState,
        settings,
        loading: false,
      }));
      return settings;
    } catch (e: any) {
      message(e.message);
      clearError();
    }
  }, [clearError, message, request]);

  const saveSettings = async (settings: Settings) => {
    try {
      SettingsSchema.parse(settings);
      await request("/api/settings/save", "POST", { ...settings });
      getSettings();
      message("Settings saved!", "success");
    } catch (e: any) {
      message(e.message);
      clearError();
    }
  };

  const getTeams = async () => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      loading: true,
    }));
    try {
      const response = await request("/api/team/teams", "POST", {});

      const teams = TeamsSchema.parse(response);

      setAppState((prevAppState) => ({
        ...prevAppState,
        teams,
        loading: false,
      }));
      return teams;
    } catch (e: any) {
      message(e.message);
      clearError();
    }
  };

  const editTeamInfo = async (team: Team) => {
    try {
      TeamSchema.parse(team);
      await request("/api/team/edit-table-info", "POST", {
        ...team,
      });
      getTeams();
    } catch (e: any) {
      message(e.message);
      clearError();
    }
  };

  const getPlayers = async () => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      loading: true,
    }));
    try {
      const response = await request("/api/player/players", "POST", {});

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
      setAppState((prevAppState) => ({
        ...prevAppState,
        players,
        loading: false,
      }));
      return players;
    } catch (e: any) {
      message(e.message);
      clearError();
    }
  };

  const getPlayerById = async (pId: string) => {
    try {
      const response = await request("/api/player/id", "POST", { _id: pId });

      const player = PlayerSchema.parse(response);

      return player;
    } catch (e: any) {
      message(e.message);
      clearError();
    }
  };

  const getBirthdayPlayers = async () => {
    try {
      const response = await request("/api/player/birthDay", "POST", {});

      const birthDayPlayers = PlayersSchema.parse(response);

      setAppState((prevAppState) => ({
        ...prevAppState,
        birthDayPlayers,
      }));
      return birthDayPlayers;
    } catch (e: any) {
      message(e.message);
      clearError();
    }
  };

  const getGames = async () => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      loading: true,
    }));
    try {
      const response = await request("/api/game/games", "POST", {});

      const games = GamesSchema.parse(response);

      setAppState((prevAppState) => ({
        ...prevAppState,
        games,
        loading: false,
      }));
      return games;
    } catch (e: any) {
      message(e.message);
      clearError();
    }
  };

  const completeGame = async (game: Partial<Game>) => {
    try {
      NewGameSchema.parse(game);
      await request("/api/game/complete-game", "POST", {
        ...game,
      });
      console.log("passed");
      getGames();
    } catch (e: any) {
      console.log(e.message);

      message(e.message);
      clearError();
    }
  };

  const editGame = async (game: Partial<Game>) => {
    try {
      GameSchema.parse(game);
      await request("/api/game/edit-game", "POST", {
        ...game,
      });
      getGames();
    } catch (e: any) {
      message(e.message);
      clearError();
    }
  };

  const deleteGame = async (gameID: string) => {
    try {
      await request("/api/game/delete-game", "POST", {
        _id: gameID,
      });
      getGames();
    } catch (e: any) {
      message(e.message);
      clearError();
    }
  };

  const getDates = async () => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      loading: true,
    }));
    try {
      const response = await request("/api/date/dates", "POST", {});

      const dates = DatesSchema.parse(response);

      setAppState((prevAppState) => ({
        ...prevAppState,
        dates,
        loading: false,
      }));
      return dates;
    } catch (e: any) {
      message(e.message);
      clearError();
    }
  };

  const addDate = async (date: DateType) => {
    try {
      DateSchema.parse(date);
      await request("/api/date/add-date", "POST", { ...date });
      getDates();
    } catch (e: any) {
      message(e.message);
      clearError();
    }
  };

  const getPlayoffsMatchups = async () => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      loading: true,
    }));
    try {
      const response = await request("/api/bracket/get", "POST", {});

      const playoffsmatchups = PlayoffsMatchupsSchema.parse(response);

      setAppState((prevAppState) => ({
        ...prevAppState,
        playoffsmatchups,
        loading: false,
      }));
      return playoffsmatchups;
    } catch (e: any) {
      message(e.message);
      clearError();
    }
  };

  const buildPlayoffsBracket = async () => {
    try {
      await request("/api/bracket/build", "POST", {});
      getSettings();
    } catch (e: any) {
      message(e.message);
      clearError();
    }
  };

  const clearPlayoffsBracket = async () => {
    try {
      await request("/api/bracket/clear", "POST", {});
      getSettings();
    } catch (e: any) {
      message(e.message);
      clearError();
    }
  };

  const [appState, setAppState] = useState<Context>({
    settings: {
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

    getSettings,
    saveSettings,
    getTeams,
    editTeamInfo,
    getPlayers,
    getPlayerById,
    getBirthdayPlayers,
    getGames,
    completeGame,
    editGame,
    deleteGame,
    getDates,
    addDate,
    getPlayoffsMatchups,
    buildPlayoffsBracket,
    clearPlayoffsBracket,
    loading: false,
  });

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};
