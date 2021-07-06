const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const Player = require("../models/Player");
const router = Router();

// /api/auth/login
router.post("/players", async (req, res) => {
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
  const player = await Player.find({});

  if (!player) return res.status(400).json({ message: "Game not found" });

  res.json({ name: player.name });
});

module.exports = router;
