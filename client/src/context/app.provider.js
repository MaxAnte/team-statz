import React, { useState, createContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const message = useMessage();
  const { request, clearError } = useHttp();

  const getSettings = async () => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      loading: true,
    }));
    try {
      const response = await request("/api/settings/get", "POST", {});
      setAppState((prevAppState) => ({
        ...prevAppState,
        settings: Object.values(response)[0],
        loading: false,
      }));
      return response;
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
      setAppState((prevAppState) => ({
        ...prevAppState,
        teams: Object.values(response),
        loading: false,
      }));
      return response;
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
      if (Object.keys(response).length) {
        const bestPts = { pts: 0, id: 0 };
        const bestReb = { reb: 0, id: 0 };
        const bestAst = { ast: 0, id: 0 };
        const bestBlk = { blk: 0, id: 0 };
        const bestStl = { stl: 0, id: 0 };
        Object.values(response).forEach((el) => {
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
        Object.values(response).forEach((el) => {
          if (el._id === bestPts.id) el.bestInPts = true;
          if (el._id === bestReb.id) el.bestInReb = true;
          if (el._id === bestAst.id) el.bestInAst = true;
          if (el._id === bestBlk.id) el.bestInBlk = true;
          if (el._id === bestStl.id) el.bestInStl = true;
        });
      }
      setAppState((prevAppState) => ({
        ...prevAppState,
        players: Object.values(response),
        loading: false,
      }));
      return response;
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
      setAppState((prevAppState) => ({
        ...prevAppState,
        games: response,
        loading: false,
      }));
      return response;
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
      setAppState((prevAppState) => ({
        ...prevAppState,
        dates: response,
        loading: false,
      }));
      return response;
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
      setAppState((prevAppState) => ({
        ...prevAppState,
        playoffsmatchups: response,
        loading: false,
      }));
      return response;
    } catch (e) {
      message(e.message);
      clearError();
    }
  };

  const buildPlayoffsBracket = async () => {
    try {
      await request("/api/bracket/build", "POST", {});
    } catch (e) {
      message(e.message);
      clearError();
    }
  };

  const clearPlayoffsBracket = async () => {
    try {
      await request("/api/bracket/clear", "POST", {});
      setAppState((prevAppState) => ({
        ...prevAppState,
        playoffsmatchups: [],
      }));
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

    getSettings: getSettings,
    getTeams: getTeams,
    getPlayers: getPlayers,
    getGames: getGames,
    getDates: getDates,
    getPlayoffsMatchups: getPlayoffsMatchups,
    buildPlayoffsBracket: buildPlayoffsBracket,
    clearPlayoffsBracket: clearPlayoffsBracket,
    loading: false,
  });

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};
