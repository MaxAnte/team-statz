import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Games from "./components/Games/Games";
import Team from "./components/Team/Team";
import PlayerCard from "./components/PlayerCard/PlayerCard";
import Schedule from "./components/Schedule/Schedule";
import Stats from "./components/Stats/Stats";
import Loader from "./components/Loader/Loader";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hook";

import "./App.css";
import styles from "./background.module.css";

function App({ store }) {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  console.log("store:", store, "moder:", isAuthenticated);

  if (!ready) return <Loader />;

  const checkDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const christmas = new Date(`${year} December 17`);
    const endChristmas = new Date(`${year + 1} January 10`);
    if (now >= christmas && now <= endChristmas) return styles.christmas;
    return styles.baseBg;
  };

  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isAuthenticated }}
    >
      <Router>
        <div className={`app ${checkDate()}`}>
          <Header />
          <main>
            <Switch>
              <Route path="/" exact component={() => <Games store={store} />} />
              <Route
                path="/team"
                component={() => (
                  <Team players={store.players} games={store.games} />
                )}
              />
              <Route path="/player/:id" component={PlayerCard} />
              <Route
                path="/schedule"
                component={() => <Schedule games={store.games} />}
              />
              <Route path="/stats" component={Stats} />
            </Switch>
          </main>
          <Footer>© Max Zahorskyi 2021</Footer>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
