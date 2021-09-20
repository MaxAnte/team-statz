import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SessionProvider } from "./context/session.provider.tsx";
import { AppProvider } from "./context/app.provider.tsx";
import { useAuth } from "./hooks/auth.hook.tsx";
import { useHttp } from "./hooks/http.hook.tsx";
import { checkDate } from "./helpers/time.helpers.ts";

import Header from "./components/Header/header.tsx";
import Footer from "./components/Footer/footer";
import Games from "./components/Games/Games";
import Team from "./components/Team/team.tsx";
import Player from "./components/Player/player.tsx";
import Schedule from "./components/Schedule/schedule.tsx";
import Stats from "./components/Stats/stats.tsx";
import Playoffs from "./components/Playoff/playoffs.tsx";
import AppSettings from "./components/AppSettings/appSettings.tsx";
import BirthDayResolver from "./components/BirthDayReslover/birthDayResolver.tsx";
import ErrorPage from "./components/ErrorPage/errorPage.tsx";
import Loader from "./components/Loader/loader.tsx";

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
