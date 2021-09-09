import React, { useState, useEffect, createContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const message = useMessage();
  const { request, clearError } = useHttp();
  const [settings, setSettings] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const data = await request("/api/settings/get", "POST", {});
        if (Object.keys(data).length) setSettings(Object.values(data)[0]);
      } catch (e) {
        message(e.message);
        clearError();
      }
    })();
  }, [request, message, clearError]);

  return <AppContext.Provider value={settings}>{children}</AppContext.Provider>;
};
