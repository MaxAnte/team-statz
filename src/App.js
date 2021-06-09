import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Games from "./components/Games/Games";
import Team from "./components/Team/Team";
import PlayerCard from "./components/PlayerCard/PlayerCard";
import Schedule from "./components/Schedule/Schedule";
import Stats from "./components/Stats/Stats";

import './App.css'
import styles from "./background.module.css";

function App({ store }) {
  // console.log(store);
  
  const checkDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const christmas = new Date(`${year} December 10`);
    const endChristmas = new Date(`${year + 1} January 10`)
    if(now >= christmas && now <= endChristmas) return styles.christmas;
    return styles.baseBg
  }

  return (
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
  );
}

export default App;
