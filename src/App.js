import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Games from "./components/Games/Games";
import Team from "./components/Team/Team";
import PlayerCard from "./components/PlayerCard/PlayerCard";
import Schedule from "./components/Schedule/Schedule";
import Stats from "./components/Stats/Stats";

import "./App.css";

function App({ store }) {
  // console.log(store);

  return (
    <Router>
      <div className="App">
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
