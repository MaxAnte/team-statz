import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import blankPhoto from "./assets/images/blank-silhouette.png";

const store = {
  players: [
    {
      id: 0,
      name: "Lebron James",
      position: "SF",
      image_thumb: blankPhoto,
      pts: 28.8,
      reb: 8.5,
      ast: 12.2,
      games_played: 70,
      bestInPts: false,
      bestInReb: false,
      bestInAst: false
    },
    {
      id: 1,
      name: "Nikola Jokic",
      position: "C",
      image_thumb: blankPhoto,
      pts: 26.2,
      reb: 11.8,
      ast: 9.5,
      bestInPts: false,
      bestInReb: false,
      bestInAst: false
    },
    {
      id: 2,
      name: "Stephen Curry",
      position: "PG",
      image_thumb: blankPhoto,
      pts: 35.6,
      reb: 6.5,
      ast: 8.2,
      bestInPts: false,
      bestInReb: false,
      bestInAst: false
    }
    // {
    //   id: 3,
    //   name: "Wilt Chamberlain",
    //   position: "C",
    //   image_thumb: blankPhoto,
    //   pts: 55.6,
    //   reb: 25.5,
    //   ast: 20.2,
    //   bestInPts: false,
    //   bestInReb: false,
    //   bestInAst: false
    // }
  ]
};

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);
