const { Router } = require("express");
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = Router();

const User = require("../models/User");
const DateModel = require("../models/Date");
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
    const date = new DateModel(req.body);
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
  const dates = await DateModel.find({});

  if (!dates) return res.status(400).json({ message: "Game not found" });

  res.json(dates);
});

// ===================== GAME ===================

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

// /api/game/complete-game
router.post("/game/complete-game", [], async (req, res) => {
  try {
    let game = await Game.findOne({ date: req.body.date });
    const { enemy, time } = game;
    const { ourScore, enemyScore, playersStats, date, quarters } = req.body;

    game.pending = false;
    game.ourScore = ourScore;
    game.enemyScore = enemyScore;
    game.playersStats = playersStats;
    game.quarters = quarters;

    const enemyWin = +enemyScore > +ourScore;
    const enemyTeam = await Team.findOne({ name: enemy });
    const ourTeam = await Team.findOne({ name: config.get("TEAMNAME") });
    if (enemyWin) {
      enemyTeam.wins = +enemyTeam.wins + 1;
      ourTeam.loses = +ourTeam.loses + 1;
    } else {
      enemyTeam.loses = +enemyTeam.loses + 1;
      ourTeam.wins = +ourTeam.wins + 1;
    }
    if (!enemyTeam)
      return res.status(400).json({ message: `${enemyName} team not found` });

    enemyTeam.save();
    ourTeam.save();

    playersStats.forEach(async (player) => {
      const playerDB = await Player.findOne({ _id: player._id });

      if (!playerDB)
        return res
          .status(400)
          .json({ message: `${playerDB.name} Teams not found` });

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
      playerDB.plus_minus =
        (+playerDB.plus_minus + +player.plus_minus || 0) / +playerDB.gp;
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

    const dateDB = await DateModel.findOne({ date });

    if (!dateDB)
      return res.status(400).json({ message: `${dateDB} Date not found` });

    if (dateDB.enemy === enemy && dateDB.time === time) {
      dateDB.enemyScore = enemyScore;
      dateDB.ourScore = ourScore;
    }
    dateDB.save();

    await game.save();

    res.status(201).json({ message: `${game._id} has been added!` });
  } catch (e) {
    res.status(500).json({ message: "Server error! Please, try again!" });
  }
});

// /api/game/edit-game
router.post("/game/edit-game", [], async (req, res) => {
  try {
    let game = await Game.findOne({ date: req.body.date });
    const { enemy, time } = game;
    const { ourScore, enemyScore, playersStats, date, quarters } = req.body;

    const prevEnemyWin = game.enemyScore > game.ourScore;
    const enemyWin = +enemyScore > +ourScore;
    const enemyTeam = await Team.findOne({ name: enemy });
    const ourTeam = await Team.findOne({ name: config.get("TEAMNAME") });

    if (prevEnemyWin !== enemyWin) {
      if (prevEnemyWin) {
        enemyTeam.wins = enemyTeam.wins - 1;
        enemyTeam.loses = enemyTeam.loses + 1;
        ourTeam.loses = ourTeam.loses - 1;
        ourTeam.wins = ourTeam.wins + 1;
      } else {
        enemyTeam.wins = enemyTeam.wins + 1;
        enemyTeam.loses = enemyTeam.loses - 1;
        ourTeam.loses = ourTeam.loses + 1;
        ourTeam.wins = ourTeam.wins - 1;
      }
    }
    if (!enemyTeam)
      return res.status(400).json({ message: `${enemyName} team not found` });

    enemyTeam.save();
    ourTeam.save();

    game.ourScore = ourScore;
    game.enemyScore = enemyScore;
    game.quarters = quarters;

    playersStats.forEach(async (player, i) => {
      const playerDB = await Player.findOne({ _id: player._id });
      const prevPlayerDB = game.playersStats.find(
        (p) => p._id.toString() === player._id
      );

      if (!playerDB)
        return res.status(400).json({ message: `${playerDB.name} not found` });

      console.log("prev:", playerDB.mp);
      console.log(
        "params:",
        "playerDB.mp:",
        playerDB.mp,
        "playerDB.gp:",
        playerDB.gp,
        "prevPlayerDB.minutes:",
        prevPlayerDB.minutes,
        "player.minutes:",
        player.minutes
      );
      playerDB.mp =
        (+playerDB.mp * +playerDB.gp -
          +prevPlayerDB.minutes +
          +player.minutes || 0) / +playerDB.gp;

      console.log("past:", playerDB.mp);

      playerDB.pts =
        (+playerDB.pts * +playerDB.gp - +prevPlayerDB.pts + +player.pts || 0) /
        +playerDB.gp;

      playerDB.oreb = +playerDB.oreb - +prevPlayerDB.oreb + +player.oreb || 0;
      playerDB.dreb = +playerDB.dreb - +prevPlayerDB.dreb + +player.dreb || 0;
      playerDB.reb = (+playerDB.dreb + +playerDB.oreb) / +playerDB.gp;

      playerDB.ast =
        (+playerDB.ast * +playerDB.gp - +prevPlayerDB.ast + +player.ast || 0) /
        +playerDB.gp;

      playerDB.stl =
        (+playerDB.stl * +playerDB.gp - +prevPlayerDB.stl + +player.stl || 0) /
        +playerDB.gp;

      playerDB.blk =
        (+playerDB.blk * +playerDB.gp - +prevPlayerDB.blk + +player.blk || 0) /
        +playerDB.gp;

      playerDB.tov =
        (+playerDB.tov * +playerDB.gp - +prevPlayerDB.tov + +player.tov || 0) /
        +playerDB.gp;

      playerDB.fouls =
        (+playerDB.fouls * +playerDB.gp - +prevPlayerDB.fouls + +player.fouls ||
          0) / +playerDB.gp;

      playerDB.plus_minus =
        (+playerDB.plus_minus * +playerDB.gp -
          +prevPlayerDB.plus_minus +
          +player.plus_minus || 0) / +playerDB.gp;

      playerDB.fta =
        (+playerDB.fta * +playerDB.gp - +prevPlayerDB.fta + +player.fta || 0) /
        +playerDB.gp;

      playerDB.ftm =
        (+playerDB.ftm * +playerDB.gp - +prevPlayerDB.ftm + +player.ftm || 0) /
        +playerDB.gp;

      playerDB.two_pa =
        (+playerDB.two_pa * +playerDB.two_pa -
          +prevPlayerDB.two_pa +
          +player.two_pa || 0) / +playerDB.gp;

      playerDB.two_pm =
        (+playerDB.two_pm * +playerDB.gp -
          +prevPlayerDB.two_pm +
          +player.two_pm || 0) / +playerDB.gp;

      playerDB.three_pa =
        (+playerDB.three_pa * +playerDB.gp -
          +prevPlayerDB.three_pa +
          +player.three_pa || 0) / +playerDB.gp;

      playerDB.three_pm =
        (+playerDB.three_pm * +playerDB.gp -
          +prevPlayerDB.three_pm +
          +player.three_pm || 0) / +playerDB.gp;

      playerDB.save();

      if (i === playersStats.length - 1) {
        console.log("LETS GOOOO");
        game.playersStats = playersStats;

        const dateDB = await DateModel.findOne({ date });

        if (!dateDB)
          return res.status(400).json({ message: `${dateDB} Date not found` });

        if (dateDB.enemy === enemy && dateDB.time === time) {
          dateDB.enemyScore = enemyScore;
          dateDB.ourScore = ourScore;
        }
        dateDB.save();

        await game.save();
        res.status(201).json({ message: `${game._id} has been updated!` });
      }
    });
  } catch (e) {
    res.status(500).json({ message: "Server error! Please, try again!" });
  }
});

// /api/game/delete-game
router.post("/game/delete-game", [], async (req, res) => {
  try {
    let game = await Game.findOne({ _id: req.body._id });

    const { date, enemy } = game;

    const enemyWin = +game.enemyScore > +game.ourScore;
    const enemyTeam = await Team.findOne({ name: enemy });
    const ourTeam = await Team.findOne({ name: config.get("TEAMNAME") });

    if (game.ourScore !== 0 && game.enemyScore !== 0) {
      if (enemyWin) {
        enemyTeam.wins = enemyTeam.wins - 1;
        ourTeam.loses = ourTeam.loses - 1;
      } else {
        enemyTeam.loses = enemyTeam.loses - 1;
        ourTeam.wins = ourTeam.wins - 1;
      }
      if (!enemyTeam)
        return res.status(400).json({ message: `${enemyName} team not found` });

      enemyTeam.save();
      ourTeam.save();
    }

    game.playersStats.forEach(async (player) => {
      const playerDB = await Player.findOne({ _id: player._id });

      if (!playerDB)
        return res
          .status(400)
          .json({ message: `${playerDB.name} Teams not found` });

      playerDB.gp -= 1;
      playerDB.mp = +playerDB.gp
        ? (+playerDB.mp * (+playerDB.gp + 1) - +player.minutes || 0) /
          +playerDB.gp
        : 0;

      playerDB.pts = +playerDB.gp
        ? (+playerDB.pts * (+playerDB.gp + 1) - +player.pts || 0) / +playerDB.gp
        : 0;

      playerDB.oreb = +playerDB.gp ? +playerDB.oreb - +player.oreb || 0 : 0;
      playerDB.dreb = +playerDB.gp ? +playerDB.dreb - +player.dreb || 0 : 0;
      playerDB.reb = +playerDB.gp
        ? (+playerDB.dreb + +playerDB.oreb) / (+playerDB.gp + 1)
        : 0;

      playerDB.ast = +playerDB.gp
        ? (+playerDB.ast * (+playerDB.gp + 1) - +player.ast || 0) / +playerDB.gp
        : 0;

      playerDB.stl = +playerDB.gp
        ? (+playerDB.stl * (+playerDB.gp + 1) - +player.stl || 0) / +playerDB.gp
        : 0;

      playerDB.blk = +playerDB.gp
        ? (+playerDB.blk * (+playerDB.gp + 1) - +player.blk || 0) / +playerDB.gp
        : 0;

      playerDB.tov = +playerDB.gp
        ? (+playerDB.tov * (+playerDB.gp + 1) - +player.tov || 0) / +playerDB.gp
        : 0;

      playerDB.fouls = +playerDB.gp
        ? (+playerDB.fouls * (+playerDB.gp + 1) - +player.fouls || 0) /
          +playerDB.gp
        : 0;

      playerDB.plus_minus = +playerDB.gp
        ? (+playerDB.plus_minus * (+playerDB.gp + 1) - +player.plus_minus ||
            0) / +playerDB.gp
        : 0;

      playerDB.fta = +playerDB.gp
        ? (+playerDB.fta * (+playerDB.gp + 1) - +player.fta || 0) / +playerDB.gp
        : 0;

      playerDB.ftm = +playerDB.gp
        ? (+playerDB.ftm * (+playerDB.gp + 1) - +player.ftm || 0) / +playerDB.gp
        : 0;

      playerDB.two_pa = +playerDB.gp
        ? (+playerDB.two_pa * (+playerDB.gp + 1) - +player.two_pa || 0) /
          +playerDB.gp
        : 0;

      playerDB.two_pm = +playerDB.gp
        ? (+playerDB.two_pm * (+playerDB.gp + 1) - +player.two_pm || 0) /
          +playerDB.gp
        : 0;

      playerDB.three_pa = +playerDB.gp
        ? (+playerDB.three_pa * (+playerDB.gp + 1) - +player.three_pa || 0) /
          +playerDB.gp
        : 0;

      playerDB.three_pm = +playerDB.gp
        ? (+playerDB.three_pm * (+playerDB.gp + 1) - +player.three_pm || 0) /
          +playerDB.gp
        : 0;

      playerDB.save();
    });

    await DateModel.deleteOne({ date });
    await Game.deleteOne({ _id: req.body._id });

    res.status(201).json({ message: `${game._id} has been removed!` });
  } catch (e) {
    res.status(500).json({ message: "Server error! Please, try again!" });
  }
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

// /api/player/birthDay
router.post("/player/birthDay", async (req, res) => {
  const today = new Date();
  const todayToLocalUsedStr = `${today.getFullYear()}-${
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1
  }-${today.getDate()}`;
  const players = await Player.find({});
  if (!players)
    return res.status(400).json({ message: "There are no active players" });

  const birthDays = players.filter(
    (player) => player.birthDate.slice(5) === todayToLocalUsedStr.slice(5)
  );

  res.json({ ...birthDays });
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

// ==================== WARNING ==================
//DO NOT UNCOMMENT THIS IF YOU DONT WANT TO BREAK EVERYTHNIG
// CLEAN ALL PLAYERS STATS

// // /api/game/edit-game
// router.post("/players/clean", [], async (req, res) => {
//   try {
//     const players = await Player.find({});
//     players.forEach((player) => {
//       player.mp = 0;
//       player.pts = 0;
//       player.oreb = 0;
//       player.dreb = 0;
//       player.reb = 0;
//       player.ast = 0;
//       player.stl = 0;
//       player.blk = 0;
//       player.tov = 0;
//       player.fouls = 0;
//       player.plus_minus = 0;
//       player.fta = 0;
//       player.ftm = 0;
//       player.two_pa = 0;
//       player.two_pm = 0;
//       player.three_pa = 0;
//       player.three_pm = 0;
//       player.save();
//     });

//     res.status(201).json({ message: "Good!" });
//   } catch (e) {
//     res.status(500).json({ message: "Server error! Please, try again!" });
//   }
// });

module.exports = router;
