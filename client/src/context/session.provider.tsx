import React, { createContext } from "react";
import { useAuth } from "../hooks/auth.hook";
import { Session } from "./session.types";

type Props = {
  children: React.ReactChild;
};

export const SessionContext = createContext<Session>(undefined!);

export const SessionProvider = ({ children }: Props) => {
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
