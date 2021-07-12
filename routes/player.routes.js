const { Router } = require("express");
const { validationResult } = require("express-validator");
const Player = require("../models/Player");
const router = Router();

// /api/player/players
router.post("/players", async (req, res) => {
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

// /api/player/id
router.post("/id", async (req, res) => {
  const { _id } = req.body;
  const playerDB = await Player.findOne({ _id });

  if (!playerDB)
    return res.status(400).json({ message: "There are no active players" });

  res.json(playerDB);
});

// /api/player/update
router.post("/update", [], async (req, res) => {
  const { player } = req.body;
  const playerDB = await Player.findOne({ _id: player._id });

  if (!playerDB)
    return res.status(400).json({ message: `${playerDB} Teams not found` });

  playerDB.gp += 1;
  playerDB.mp = (playerDB.mp + player.minutes) / playerDB.gp;
  playerDB.pts = (playerDB.pts + player.pts) / playerDB.gp;
  playerDB.oreb += player.oreb;
  playerDB.dreb += player.dreb;
  playerDB.reb = (+playerDB.dreb + +player.oreb) / playerDB.gp;
  playerDB.ast = (playerDB.ast + player.ast) / playerDB.gp;
  playerDB.stl = (playerDB.stl + player.stl) / playerDB.gp;
  playerDB.blk = (playerDB.blk + player.blk) / playerDB.gp;
  playerDB.tov = (playerDB.tov + player.tov) / playerDB.gp;
  playerDB.fouls = (playerDB.fouls + player.fouls) / playerDB.gp;
  playerDB.fta = (playerDB.fta + player.fta) / playerDB.gp;
  playerDB.ftm = (playerDB.ftm + player.ftm) / playerDB.gp;
  playerDB.two_pa = (playerDB.two_pa + player.two_pa) / playerDB.gp;
  playerDB.two_pm = (playerDB.two_pm + player.two_pm) / playerDB.gp;
  playerDB.three_pa = (playerDB.three_pa + player.three_pa) / playerDB.gp;
  playerDB.three_pm = (playerDB.three_pm + player.three_pm) / playerDB.gp;

  playerDB.save();

  res.json({ ...playerDB });
});

module.exports = router;
