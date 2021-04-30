import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import blankPhoto from "./assets/images/blank-silhouette.png";

const store = {
  games: [
    {
      id: 0,
      enemy: "Veterans",
      ourScore: 100,
      enemyScore: 97,
      date: "01.01.2021"
    },
    {
      id: 1,
      enemy: "VTK",
      ourScore: 120,
      enemyScore: 70,
      date: "02.02.2021"
    },
    {
      id: 2,
      enemy: "Warriors",
      ourScore: 92,
      enemyScore: 115,
      date: "03.03.2021"
    },
    {
      id: 3,
      enemy: "Termits",
      ourScore: 99,
      enemyScore: 108,
      date: "04.04.2021"
    }
  ],
  players: [
    {
      id: 0,
      name: "Lebron James",
      position: "SF",
      image_thumb: blankPhoto,
      pts: 28.8,
      reb: 8.5,
      ast: 12.2,
      blk: 0.7,
      stl: 0.9,
      fga: 80,
      fgm: 50,
      bestInPts: false,
      bestInReb: false,
      bestInAst: false,
      bestInBlk: false,
      bestInStl: false
    },
    {
      id: 1,
      name: "Nikola Jokic",
      position: "C",
      image_thumb: blankPhoto,
      pts: 26.2,
      reb: 13.8,
      ast: 9.5,
      blk: 1.2,
      stl: 0.4,
      fga: 60,
      fgm: 40,
      bestInPts: false,
      bestInReb: false,
      bestInAst: false,
      bestInBlk: false,
      bestInStl: false
    },
    {
      id: 2,
      name: "Stephen Curry",
      position: "PG",
      image_thumb: blankPhoto,
      pts: 35.6,
      reb: 6.5,
      ast: 8.2,
      blk: 0.2,
      stl: 1.5,
      fga: 120,
      fgm: 70,
      bestInPts: false,
      bestInReb: false,
      bestInAst: false,
      bestInBlk: false,
      bestInStl: false
    },
    {
      id: 3,
      name: "Hakeem Olajuwon",
      position: "C",
      image_thumb: blankPhoto,
      pts: 24.6,
      reb: 12.5,
      ast: 5.2,
      blk: 4.9,
      stl: 0.5,
      fga: 150,
      fgm: 120,
      bestInPts: false,
      bestInReb: false,
      bestInAst: false,
      bestInBlk: false,
      bestInStl: false
    },
    {
      id: 4,
      name: "John Stockton",
      position: "PG",
      image_thumb: blankPhoto,
      pts: 22.6,
      reb: 6.2,
      ast: 10.2,
      blk: 0.2,
      stl: 2.5,
      fga: 80,
      fgm: 70,
      bestInPts: false,
      bestInReb: false,
      bestInAst: false,
      bestInBlk: false,
      bestInStl: false
    }
    // {
    //   id: 100,
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
