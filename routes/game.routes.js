const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const Game = require("../models/Game");
const router = Router();

// /api/game/add-game
router.post("/add-game", [], async (req, res) => {
  console.log("Req body:", req.body);
  try {
    const game = new Game(req.body);

    await game.save();

    res.status(201).json({ message: "Game has been added!" });
  } catch (e) {
    console.log("Error:", e.message);
    res.status(500).json({ message: "Server error! Please, try again!" });
  }
});

// /api/game/games
router.post("/games", async (req, res) => {
  console.log("Req body:", req.body);
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
