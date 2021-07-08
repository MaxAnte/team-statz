const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const Game = require("../models/Game");
const router = Router();

// /api/game/add-game
router.post(
  "/add-game",
  [
    check("login", "Wrong login!").isLength({ min: 5 }),
    check("password", "Minimum 5 symbols").isLength({ min: 5 }),
  ],
  async (req, res) => {
    console.log("Req body:", req.body);
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({
          errors: errors.array(),
          message: "Wrong login or password",
        });

      const { login, password } = req.body;

      const candidate = await User.findOne({ login });

      if (candidate)
        return res.status(400).json({ message: "That user already exists!" });

      const user = new User({ login, password });

      await user.save();

      res.status(201).json({ message: "User has been registered!" });
    } catch (e) {
      console.log("Error:", e.message);
      res.status(500).json({ message: "Server error! Please, try again!" });
    }
  }
);

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
  const game = await Game.find({});

  if (!game) return res.status(400).json({ message: "Game not found" });

  res.json({ enemy: game.enemy });
});

module.exports = router;
