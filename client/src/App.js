import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { AppProvider } from "./context/app.provider";
import { useAuth } from "./hooks/auth.hook";
import { useHttp } from "./hooks/http.hook";
import { checkDate } from "./helpers/time.helpers";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Games from "./components/Games/Games";
import Team from "./components/Team/Team";
import Player from "./components/Player/Player";
import Schedule from "./components/Schedule/Schedule";
import Stats from "./components/Stats/Stats";
import Playoffs from "./components/Playoff/Playoffs";
import AppSettings from "./components/AppSettings/AppSettings";
import BirthDayResolver from "./components/BirthDayReslover/BirthDayResolver";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Loader from "./components/Loader/Loader";

import "./i18n/config";

import "./App.css";
import styles from "./background.module.css";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const { request } = useHttp();

  // const cleanAllPlayersStats = useCallback(async () => {
  //   try {
  //     await request("/api/players/clean", "POST", {});
  //   } catch (e) {}
  // }, [request]);

  // useEffect(() => {
  //   cleanAllPlayersStats();
  // }, [cleanAllPlayersStats]);

  if (!ready) return <Loader />;

  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isAuthenticated }}
    >
      <AppProvider>
        <Router>
          <div className={`app ${styles[checkDate()]}`}>
            <Header />
            <main>
              <Switch>
                <Route path="/" exact component={Games} />
                <Route path="/team" component={Team} />
                <Route path="/player/:id" component={Player} />
                <Route path="/schedule" component={Schedule} />
                <Route path="/stats" component={Stats} />
                <Route path="/playoffs" component={Playoffs} />
                <Route path="/app/settings" component={AppSettings} />
                <Route path="*" component={ErrorPage} />
              </Switch>
            </main>
            <BirthDayResolver />
            <Footer>© Max Zahorskyi 2021</Footer>
          </div>
        </Router>
      </AppProvider>
    </AuthContext.Provider>
  );
}

export default App;
