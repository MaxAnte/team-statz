const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const Game = require("../models/Game");
const router = Router();

// /api/auth/login
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
  const game = await Game.find({});

  if (!game) return res.status(400).json({ message: "Game not found" });

  res.json({ enemy: game.enemy });
});

module.exports = router;
