const { Router } = require("express");
const { validationResult } = require("express-validator");
const Player = require("../models/Player");
const router = Router();

// /api/player/players
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
  const players = await Player.find({});

  if (!players)
    return res.status(400).json({ message: "There are no active players" });

  res.json({ ...players });
});

module.exports = router;
