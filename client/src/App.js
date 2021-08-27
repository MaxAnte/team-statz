import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hook";
import { checkDate } from "./helpers/time.helpers";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Games from "./components/Games/Games";
import Team from "./components/Team/Team";
import Player from "./components/Player/Player";
import Schedule from "./components/Schedule/Schedule";
import Stats from "./components/Stats/Stats";
import Loader from "./components/Loader/Loader";
import Playoffs from "./components/Playoff/Playoffs";
import BirthDayResolver from "./components/BirthDayReslover/BirthDayResolver";

import "./i18n/config";

import "./App.css";
import styles from "./background.module.css";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;

  if (!ready) return <Loader />;

  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isAuthenticated }}
    >
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
            </Switch>
          </main>
          <BirthDayResolver />
          <Footer>© Max Zahorskyi 2021</Footer>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
