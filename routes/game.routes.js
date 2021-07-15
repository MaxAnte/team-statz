const { Router } = require("express");
const { validationResult } = require("express-validator");
const http = require("http");
const Game = require("../models/Game");

const router = Router();

const updateTeamDB = async (enemyName, enemyScore, ourScore) => {
  const winFlag = enemyScore > ourScore;
  const data = JSON.stringify({ enemyName, winFlag });
  const options = {
    hostname: "localhost",
    port: 3000,
    path: "/api/team/update",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
  });
  req.on("error", (error) => {
    console.error(error);
  });
  req.write(data);
  req.end();
};

const updatePlayerDB = async (playersStats) => {
  playersStats.forEach((player) => {
    const data = JSON.stringify({ player });
    const options = {
      hostname: "localhost",
      port: 3000,
      path: "/api/player/update",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = http.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
    });
    req.on("error", (error) => {
      console.error(error);
    });
    req.write(data);
    req.end();
  });
};
const updateDateDB = async (date, time, enemy, enemyScore, ourScore) => {
  const data = JSON.stringify({ date, time, enemy, enemyScore, ourScore });
  const options = {
    hostname: "localhost",
    port: 3000,
    path: "/api/date/update",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
  });
  req.on("error", (error) => {
    console.error(error);
  });
  req.write(data);
  req.end();
};

// /api/game/add-game
router.post("/add-game", [], async (req, res) => {
  try {
    const game = new Game(req.body);

    const { enemy, ourScore, enemyScore, playersStats, date, time } = req.body;

    updateTeamDB(enemy, enemyScore, ourScore);
    updatePlayerDB(playersStats);
    updateDateDB(date, time, enemy, enemyScore, ourScore);

    await game.save();

    res.status(201).json({ message: `${game} has been added!` });
  } catch (e) {
    console.log("Error:", e.message);
    res.status(500).json({ message: "Server error! Please, try again!" });
  }
});

// /api/game/games
router.post("/games", async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Wrong login or password" });
  } catch (e) {
    res.status(500).json({ message: "Server error! Please, try again!" });
  }
  const games = await Game.find({});

  if (!games) return res.status(400).json({ message: "Game not found" });

  res.json(games);
});

module.exports = router;
