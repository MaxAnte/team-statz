import React, { useState, useEffect, createContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const message = useMessage();
  const { request, clearError } = useHttp();
  const [appState, setAppState] = useState({
    settings: {},
    teams: [],
    players: [],
    games: [],
    dates: [],
    playoffsmatchups: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await request("/api/settings/get", "POST", {});
        setAppState({ ...appState, settings: Object.values(response)[0] });
      } catch (e) {
        message(e.message);
        clearError();
      }
    })();
  }, [request, message, clearError]);

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};
