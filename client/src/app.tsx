/* eslint-disable */
import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SessionProvider } from "./session/session.provider";
import { AppProvider } from "./app/app.provider";
import { useAuth } from "./hooks/auth.hook";
import { useHttp } from "./hooks/http.hook";
import { checkDate } from "./helpers/time.helpers";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Games from "./components/Games/games";
import Team from "./components/Team/team";
import Player from "./components/Player/player";
import Schedule from "./components/Schedule/schedule";
import Stats from "./components/Stats/stats";
import Playoffs from "./components/Playoff/playoffs";
import AppSettings from "./components/AppSettings/appSettings";
import BirthDayResolver from "./components/BirthDayReslover/birthDayResolver";
import ErrorPage from "./components/ErrorPage/errorPage";
import Loader from "./components/Loader/loader";

import "./i18n/config";

import "./App.css";
import styles from "./background.module.css";

function App() {
  const { ready } = useAuth();
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
    <SessionProvider>
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
    </SessionProvider>
  );
}

export default App;
