import React, { createContext } from "react";
import { useAuth } from "../hooks/auth.hook";

function noop() {}
export const SessionContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});

export const SessionProvider = ({ children }) => {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  return (
    <SessionContext.Provider
      value={{ token, userId, login, logout, isAuthenticated }}
    >
      {children}
    </SessionContext.Provider>
  );
};
