const { Router } = require("express");
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = Router();

const User = require("../models/User");
const Date = require("../models/Date");
const Game = require("../models/Game");
const Team = require("../models/Team");
const Player = require("../models/Player");

// ===================== AUTH ===================

// /api/auth/login
router.post(
  "/auth/login",
  [
    // check("email", "Wrong email format!").normalizeEmail().isEmail(),
    check("login", "Wrong login!").isLength({ min: 5 }),
    check("password", "Minimum 6 symbols").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Wrong login or password" });
    } catch (e) {
      res.status(500).json({ message: "Server error! Please, try again!" });
    }

    const { login, password } = req.body;

    const user = await User.findOne({ login });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (password !== user.password)
      return res.status(400).json({ message: "Incorect password" });

    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });

    res.json({ token, userId: user.id });
  }
);

// /api/auth/register
router.post(
  "/auth/register",
  [
    // check("email", "Wrong email format!").isEmail(),
    check("login", "Wrong login!").isLength({ min: 5 }),
    check("password", "Minimum 5 symbols").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Wrong login or password" });

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

// ===================== DATE ===================

// /api/date/add-date
router.post("/date/add-date", [], async (req, res) => {
  try {
    const date = new Date(req.body); // new Date (model)
    const game = new Game(date);

    await game.save();
    await date.save();
    res.status(201).json({ message: `${game} on ${date} has been added!` });
  } catch (e) {
    console.log("Error:", e.message);
    res.status(500).json({ message: "Server error! Please, try again!" });
  }
});

// /api/date/games
router.post("/date/dates", async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Wrong login or password" });
  } catch (e) {
    res.status(500).json({ message: "Server error! Please, try again!" });
  }
  const dates = await Date.find({});

  if (!dates) return res.status(400).json({ message: "Game not found" });

  res.json(dates);
});

// ===================== GAME ===================

// /api/game/complete-game
router.post("/game/complete-game", [], async (req, res) => {
  try {
    let game = await Game.findOne({ date: req.body.date });
    const { enemy, time } = game;
    const { ourScore, enemyScore, playersStats, date } = req.body;

    game.pending = false;
    game.ourScore = ourScore;
    game.enemyScore = enemyScore;
    game.playersStats = playersStats;

    const enemyWin = +enemyScore > +ourScore;
    const team = await Team.findOne({ name: enemy });
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

    playersStats.forEach(async (player) => {
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
    });

    const dateDB = await Date.findOne({ date });

    if (!dateDB)
      return res.status(400).json({ message: `${dateDB} Date not found` });

    if (dateDB.enemy === enemy && dateDB.time === time) {
      dateDB.enemyScore = enemyScore;
      dateDB.ourScore = ourScore;
    }
    dateDB.save();

    await game.save();

    res.status(201).json({ message: `${game} has been added!` });
  } catch (e) {
    console.log("Error:", e.message);
    res.status(500).json({ message: "Server error! Please, try again!" });
  }
});

// /api/game/games
router.post("/game/games", async (req, res) => {
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
  games.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
  if (!games) return res.status(400).json({ message: "Game not found" });
  res.json(games);
});

// ===================== PLAYER ===================

// /api/player/players
router.post("/player/players", async (req, res) => {
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
router.post("/player/id", async (req, res) => {
  const { _id } = req.body;
  const playerDB = await Player.findOne({ _id });

  if (!playerDB)
    return res.status(400).json({ message: "There are no active players" });

  res.json(playerDB);
});

// ===================== TEAM ===================

router.post("/team/teams", [], async (req, res) => {
  const teams = await Team.find({});
  if (!teams) return res.status(400).json({ message: "Teams not found" });
  res.json({ ...teams });
});

module.exports = router;
