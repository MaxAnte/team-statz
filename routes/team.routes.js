const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const Team = require("../models/Team");
const router = Router();

router.post("/teams", [], async (req, res) => {
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

  const teams = await Team.find({});

  if (!teams) return res.status(400).json({ message: "Teams not found" });

  res.json({ ...teams });
});

router.post("/update", [], async (req, res) => {
  const { enemyName, winFlag } = req.body;
  const team = await Team.findOne({ name: enemyName });
  const ourTeam = await Team.findOne({ name: "Basketball City" });
  if (winFlag) {
    team.wins += 1;
    ourTeam.loses += 1;
  } else {
    team.loses += 1;
    ourTeam.wins += 1;
  }
  if (!team)
    return res.status(400).json({ message: `${enemyName} Teams not found` });

  team.save();
  ourTeam.save();

  res.json({ ...team });
});

module.exports = router;
