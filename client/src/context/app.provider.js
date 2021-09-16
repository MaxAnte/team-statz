import React, { useState, useEffect, createContext } from "react";
import { useHttp } from "../hooks/http.hook.tsx";
import { useMessage } from "../hooks/message.hook.tsx";
import {
  SettingsSchema,
  TeamsSchema,
  TeamSchema,
  PlayersSchema,
  GamesSchema,
  DatesSchema,
  DateSchema,
  PlayoffsMatchupsSchema,
} from "./app.schema.ts";

export const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const message = useMessage();
  const { request, clearError } = useHttp();

  useEffect(() => getSettings(), []);

  const getSettings = async () => {
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
    } catch (e) {
      message(e.message);
      clearError();
    }
  };

  const saveSettings = async (settings) => {
    try {
      SettingsSchema.parse(settings);
      await request("/api/settings/save", "POST", { ...settings });
      getSettings();
      message("Settings saved!", "success");
    } catch (e) {
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
    } catch (e) {
      message(e.message);
      clearError();
    }
  };

  const editTeamInfo = async (team) => {
    try {
      TeamSchema.parse(team);
      await request("/api/team/edit-table-info", "POST", {
        ...team,
      });
      getTeams();
    } catch (e) {
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
        const bestPts = { pts: 0, id: 0 };
        const bestReb = { reb: 0, id: 0 };
        const bestAst = { ast: 0, id: 0 };
        const bestBlk = { blk: 0, id: 0 };
        const bestStl = { stl: 0, id: 0 };
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
    } catch (e) {
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
    } catch (e) {
      message(e.message);
      clearError();
    }
  };

  const deleteGame = async (gameID) => {
    try {
      await request("/api/game/delete-game", "POST", {
        _id: gameID,
      });
      getGames();
    } catch (e) {
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
    } catch (e) {
      message(e.message);
      clearError();
    }
  };

  const addDate = async (date) => {
    try {
      DateSchema.parse(date);
      await request("/api/date/add-date", "POST", { ...date });
      getDates();
    } catch (e) {
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
    } catch (e) {
      message(e.message);
      clearError();
    }
  };

  const buildPlayoffsBracket = async () => {
    try {
      await request("/api/bracket/build", "POST", {});
      getSettings();
    } catch (e) {
      message(e.message);
      clearError();
    }
  };

  const clearPlayoffsBracket = async () => {
    try {
      await request("/api/bracket/clear", "POST", {});
      getSettings();
    } catch (e) {
      message(e.message);
      clearError();
    }
  };

  const [appState, setAppState] = useState({
    settings: {},
    teams: [],
    players: [],
    games: [],
    dates: [],
    playoffsmatchups: [],

    // getSettings: getSettings,
    saveSettings: saveSettings,
    getTeams: getTeams,
    editTeamInfo: editTeamInfo,
    getPlayers: getPlayers,
    getGames: getGames,
    deleteGame: deleteGame,
    getDates: getDates,
    addDate: addDate,
    getPlayoffsMatchups: getPlayoffsMatchups,
    buildPlayoffsBracket: buildPlayoffsBracket,
    clearPlayoffsBracket: clearPlayoffsBracket,
    loading: false,
  });

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};
