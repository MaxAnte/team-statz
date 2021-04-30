import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Games from "./components/Games/Games";
import Team from "./components/Team/Team";
import "./App.css";

function App({store}) {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route path="/" exact component={Games} />
            <Route path="/team" component={() => <Team store={store} />} />
            {/* <Route path="/schedule" component={() => <Schedule store={store} />} />
            <Route path="/games" component={() => <Games store={store} />} />
            <Route path="/stats" component={() => <Stats store={store} />} /> */}
          </Switch>
        </main>
        <Footer>© Max Zahorsky 2021</Footer>
      </div>
    </Router>
  );
}

export default App;
