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
  playerDB.mp = (+playerDB.mp + +player.minutes || 0) / +playerDB.gp;
  playerDB.pts = (+playerDB.pts + +player.pts || 0) / +playerDB.gp;
  playerDB.oreb += +player.oreb || 0;
  playerDB.dreb += +player.dreb || 0;
  playerDB.reb = (+playerDB.dreb + +playerDB.oreb) / +playerDB.gp;
  playerDB.ast = (+playerDB.ast + +player.ast || 0) / +playerDB.gp;
  playerDB.stl = (+playerDB.stl + +player.stl || 0) / +playerDB.gp;
  playerDB.blk = (+playerDB.blk + +player.blk || 0) / +playerDB.gp;
  playerDB.tov = (+playerDB.tov + +player.tov || 0) / +playerDB.gp;
  playerDB.fouls = (+playerDB.fouls + +player.fouls || 0) / +playerDB.gp;
  playerDB.fta = (+playerDB.fta + +player.fta || 0) / +playerDB.gp;
  playerDB.ftm = (+playerDB.ftm + +player.ftm || 0) / +playerDB.gp;
  playerDB.two_pa = (+playerDB.two_pa + +player.two_pa || 0) / +playerDB.gp;
  playerDB.two_pm = (+playerDB.two_pm + +player.two_pm || 0) / +playerDB.gp;
  playerDB.three_pa =
    (+playerDB.three_pa + +player.three_pa || 0) / +playerDB.gp;
  playerDB.three_pm =
    (+playerDB.three_pm + +player.three_pm || 0) / +playerDB.gp;

  playerDB.save();

  res.json({ ...playerDB });
});

module.exports = router;
