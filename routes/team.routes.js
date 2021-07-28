const { Router } = require("express");
const config = require("config");
const Team = require("../models/Team");
const router = Router();

router.post("/teams", [], async (req, res) => {
  const teams = await Team.find({});
  if (!teams) return res.status(400).json({ message: "Teams not found" });
  res.json({ ...teams });
});

router.post("/update", [], async (req, res) => {
  const { enemyName, enemyWin } = req.body;
  const team = await Team.findOne({ name: enemyName });
  const ourTeam = await Team.findOne({ name: config.get("TEAMNAME") });
  if (enemyWin) {
    team.wins = +team.wins + 1;
    ourTeam.loses = +ourTeam.loses + 1;
  } else {
    team.loses = +team.loses + 1;
    ourTeam.wins = +ourTeam.wins + 1;
  }
  if (!team)
    return res.status(400).json({ message: `${enemyName} team not found` });

  team.save();
  ourTeam.save();
  res.json({ ...team });
});

module.exports = router;
