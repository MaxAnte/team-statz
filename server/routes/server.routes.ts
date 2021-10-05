import { Router, Request, Response } from "express";
import config from "config";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import DateModel from "../models/Date.js";
import Game from "../models/Game.js";
import Team from "../models/Team.js";
import Player from "../models/Player.js";
import Settings from "../models/Settings.js";
import PlayoffsMatchup from "../models/PlayoffsMatchup.js";

import {
  Game as GameType,
  Settings as SettingsType,
  Team as TeamType,
  Player as PlayerType,
  PlayerStats,
} from "client/src/context/app.types";
import { AddDateForm } from "client/src/components/AddDatePopup/addDatePopup.types";
import { UserLoginData } from "client/src/context/session.types";

interface CustomRequest<T> extends Request {
  body: T;
}

const router = Router();

// ===================== AUTH ===================

// /api/auth/login
router.post(
  "/auth/login",
  [
    // check("email", "Wrong email format!").normalizeEmail().isEmail(),
    check("login", "Wrong login!").isLength({ min: 5 }),
    check("password", "Minimum 6 symbols").isLength({ min: 5 }),
  ],
  async (req: CustomRequest<UserLoginData>, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Wrong login or password" });
    } catch (error: any) {
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
  async (req: CustomRequest<UserLoginData>, res: Response) => {
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
    } catch (error: any) {
      console.log("Error:", error.message);
      res.status(500).json({ message: "Server error! Please, try again!" });
    }
  }
);

// ===================== DATE ===================

// /api/date/add-date
router.post(
  "/date/add-date",
  [],
  async (req: CustomRequest<AddDateForm>, res: Response) => {
    try {
      const date = new DateModel(req.body);
      const game = new Game(date);

      await game.save();
      await date.save();
      res.status(201).json({ message: `${game} on ${date} has been added!` });
    } catch (error: any) {
      console.log("Error:", error.message);
      res.status(500).json({ message: "Server error! Please, try again!" });
    }
  }
);

// /api/date/dates
router.post("/date/dates", async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Wrong login or password" });
  } catch (error: any) {
    res.status(500).json({ message: "Server error! Please, try again!" });
  }
  const dates = await DateModel.find({});

  if (!dates) return res.status(400).json({ message: "Game not found" });

  res.json(dates);
});

// ===================== GAME ===================

// /api/game/games
router.post("/game/games", async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Wrong login or password" });
  } catch (error: any) {
    res.status(500).json({ message: "Server error! Please, try again!" });
  }
  const games = await Game.find({});
  games.sort((a: GameType, b: GameType) =>
    a.date > b.date ? 1 : b.date > a.date ? -1 : 0
  );
  if (!games) return res.status(400).json({ message: "Game not found" });
  res.json(games);
});

// /api/game/complete-game
router.post(
  "/game/complete-game",
  [],
  async (req: CustomRequest<Partial<GameType>>, res: Response) => {
    try {
      let game = await Game.findOne({ date: req.body.date });
      if (!game)
        return res
          .status(400)
          .json({ message: `Cant find game at this date (${req.body.date})` });

      const { enemy, time } = game;
      const { ourScore, enemyScore, playersStats, date, quarters } = req.body;
      if (!enemyScore || !ourScore)
        return res.status(400).json({ message: "Where is the score?" });

      game.pending = false;
      game.ourScore = ourScore;
      game.enemyScore = enemyScore;
      if (playersStats) game.playersStats = playersStats;
      if (quarters) game.quarters = quarters;

      const enemyWin = +enemyScore > +ourScore;
      const enemyTeam = await Team.findOne({ name: enemy });
      if (!enemyTeam)
        return res.status(400).json({ message: `${enemy}: Team not found` });

      const settings = await Settings.findOne(
        {},
        {},
        { sort: { created_at: -1 } }
      );
      if (!settings)
        return res.status(400).json({ message: "Cant get settings" });

      const ourTeam = await Team.findOne({ name: settings.teamName });
      if (!ourTeam)
        return res
          .status(400)
          .json({ message: `${settings.teamName}: Team not found` });

      if (enemyWin) {
        enemyTeam.wins = +enemyTeam.wins + 1;
        enemyTeam.points = +enemyTeam.points + 2;
        enemyTeam.winRate =
          (+enemyTeam.wins * 100) / (+enemyTeam.wins + +enemyTeam.loses);

        ourTeam.loses = +ourTeam.loses + 1;
        ourTeam.points = +ourTeam.points + 1;
        ourTeam.winRate =
          (+ourTeam.wins * 100) / (+ourTeam.wins + +ourTeam.loses);
      } else {
        enemyTeam.loses = +enemyTeam.loses + 1;
        enemyTeam.points = +enemyTeam.points + 1;
        enemyTeam.winRate =
          (+enemyTeam.wins * 100) / (+enemyTeam.wins + +enemyTeam.loses);

        ourTeam.wins = +ourTeam.wins + 1;
        ourTeam.points = +ourTeam.points + 2;
        ourTeam.winRate =
          (+ourTeam.wins * 100) / (+ourTeam.wins + +ourTeam.loses);
      }
      if (!enemyTeam)
        return res.status(400).json({ message: `${enemy} team not found` });

      enemyTeam.save();
      ourTeam.save();

      if (playersStats) {
        playersStats.forEach(async (player: PlayerStats) => {
          const playerDB = await Player.findOne({ _id: player._id });

          if (!playerDB)
            return res
              .status(400)
              .json({ message: `${player._id}:Player not found` });

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
          playerDB.fouls =
            (+playerDB.fouls + +player.fouls || 0) / +playerDB.gp;
          playerDB.plus_minus =
            (+playerDB.plus_minus + +player.plus_minus || 0) / +playerDB.gp;
          playerDB.fta = (+playerDB.fta + +player.fta || 0) / +playerDB.gp;
          playerDB.ftm = (+playerDB.ftm + +player.ftm || 0) / +playerDB.gp;
          playerDB.two_pa =
            (+playerDB.two_pa + +player.two_pa || 0) / +playerDB.gp;
          playerDB.two_pm =
            (+playerDB.two_pm + +player.two_pm || 0) / +playerDB.gp;
          playerDB.three_pa =
            (+playerDB.three_pa + +player.three_pa || 0) / +playerDB.gp;
          playerDB.three_pm =
            (+playerDB.three_pm + +player.three_pm || 0) / +playerDB.gp;

          playerDB.save();
        });
      }

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
    } catch (error: any) {
      res.status(500).json({ message: "Server error! Please, try again!" });
    }
  }
);

// /api/game/edit-game
router.post(
  "/game/edit-game",
  [],
  async (req: CustomRequest<Partial<GameType>>, res: Response) => {
    try {
      const game = await Game.findOne({ date: req.body.date });
      if (!game)
        return res
          .status(400)
          .json({ message: `Cant find game at this date(${req.body.date})` });

      const { enemy, time } = game;
      const { ourScore, enemyScore, playersStats, date, quarters } = req.body;
      if (!enemyScore || !ourScore)
        return res.status(400).json({ message: "Where is the score?" });

      const prevEnemyWin = game.enemyScore > game.ourScore;
      const enemyWin = +enemyScore > +ourScore;
      const enemyTeam = await Team.findOne({ name: enemy });
      if (!enemyTeam)
        return res.status(400).json({ message: `${enemy}: Team not found` });

      const settings = await Settings.findOne(
        {},
        {},
        { sort: { created_at: -1 } }
      );
      if (!settings)
        return res.status(400).json({ message: "Cant get settings" });

      const ourTeam = await Team.findOne({ name: settings.teamName });
      if (!ourTeam)
        return res
          .status(400)
          .json({ message: `${settings.teamName}: Team not found` });

      if (prevEnemyWin !== enemyWin) {
        if (prevEnemyWin) {
          enemyTeam.wins = enemyTeam.wins - 1;
          enemyTeam.loses = enemyTeam.loses + 1;
          enemyTeam.points = +enemyTeam.points - 1;
          enemyTeam.winRate =
            (+enemyTeam.wins * 100) / (+enemyTeam.wins + +enemyTeam.loses);

          ourTeam.loses = ourTeam.loses - 1;
          ourTeam.wins = ourTeam.wins + 1;
          ourTeam.points = +ourTeam.points + 1;
          ourTeam.winRate =
            (+ourTeam.wins * 100) / (+ourTeam.wins + +ourTeam.loses);
        } else {
          enemyTeam.wins = enemyTeam.wins + 1;
          enemyTeam.loses = enemyTeam.loses - 1;
          enemyTeam.points = +enemyTeam.points + 1;
          enemyTeam.winRate =
            (+enemyTeam.wins * 100) / (+enemyTeam.wins + +enemyTeam.loses);

          ourTeam.loses = ourTeam.loses + 1;
          ourTeam.wins = ourTeam.wins - 1;
          ourTeam.points = +ourTeam.points - 1;
          ourTeam.winRate =
            (+ourTeam.wins * 100) / (+ourTeam.wins + +ourTeam.loses);
        }
      }

      enemyTeam.save();
      ourTeam.save();

      game.ourScore = ourScore;
      game.enemyScore = enemyScore;
      game.quarters = quarters ? quarters : game.quarters;

      if (playersStats) {
        playersStats.forEach(async (player: PlayerStats, i: number) => {
          const playerDB = await Player.findOne({ _id: player._id });
          if (!playerDB)
            return res
              .status(400)
              .json({ message: `${player._id}: Player not found` });

          const prevPlayerDB = game.playersStats.find(
            (p: PlayerStats) => p._id.toString() === player._id.toString()
          );
          if (!prevPlayerDB)
            return res
              .status(400)
              .json({ message: `Previous player for edit not found` });

          if (
            !game.playersStats.find(
              (pl: PlayerStats) => pl._id.toString() === player._id.toString()
            )
          ) {
            console.log("Adding:", playerDB._id);
            playerDB.gp += 1;
          }

          if (i === 0) {
            game.playersStats.forEach(async (p: PlayerStats) => {
              if (
                !playersStats.find(
                  (pl: PlayerStats) => pl._id.toString() === p._id.toString()
                )
              ) {
                console.log("Removing:", p._id);
                const removedPlayerDB = await Player.findOne({ _id: p._id });
                if (!removedPlayerDB)
                  return res
                    .status(400)
                    .json({ message: `${p._id}: player not found` });

                removedPlayerDB.gp -= 1;
                removedPlayerDB.mp = +removedPlayerDB.gp
                  ? (+removedPlayerDB.mp * (+removedPlayerDB.gp + 1) -
                      +player.minutes || 0) / +removedPlayerDB.gp
                  : 0;

                removedPlayerDB.pts = +removedPlayerDB.gp
                  ? (+removedPlayerDB.pts * (+removedPlayerDB.gp + 1) -
                      +player.pts || 0) / +removedPlayerDB.gp
                  : 0;

                removedPlayerDB.oreb = +removedPlayerDB.gp
                  ? +removedPlayerDB.oreb - +player.oreb || 0
                  : 0;
                removedPlayerDB.dreb = +removedPlayerDB.gp
                  ? +removedPlayerDB.dreb - +player.dreb || 0
                  : 0;
                removedPlayerDB.reb = +removedPlayerDB.gp
                  ? (+removedPlayerDB.dreb + +removedPlayerDB.oreb) /
                    (+removedPlayerDB.gp + 1)
                  : 0;

                removedPlayerDB.ast = +removedPlayerDB.gp
                  ? (+removedPlayerDB.ast * (+removedPlayerDB.gp + 1) -
                      +player.ast || 0) / +removedPlayerDB.gp
                  : 0;

                removedPlayerDB.stl = +removedPlayerDB.gp
                  ? (+removedPlayerDB.stl * (+removedPlayerDB.gp + 1) -
                      +player.stl || 0) / +removedPlayerDB.gp
                  : 0;

                removedPlayerDB.blk = +removedPlayerDB.gp
                  ? (+removedPlayerDB.blk * (+removedPlayerDB.gp + 1) -
                      +player.blk || 0) / +removedPlayerDB.gp
                  : 0;

                removedPlayerDB.tov = +removedPlayerDB.gp
                  ? (+removedPlayerDB.tov * (+removedPlayerDB.gp + 1) -
                      +player.tov || 0) / +removedPlayerDB.gp
                  : 0;

                removedPlayerDB.fouls = +removedPlayerDB.gp
                  ? (+removedPlayerDB.fouls * (+removedPlayerDB.gp + 1) -
                      +player.fouls || 0) / +removedPlayerDB.gp
                  : 0;

                removedPlayerDB.plus_minus = +removedPlayerDB.gp
                  ? (+removedPlayerDB.plus_minus * (+removedPlayerDB.gp + 1) -
                      +player.plus_minus || 0) / +removedPlayerDB.gp
                  : 0;

                removedPlayerDB.fta = +removedPlayerDB.gp
                  ? (+removedPlayerDB.fta * (+removedPlayerDB.gp + 1) -
                      +player.fta || 0) / +removedPlayerDB.gp
                  : 0;

                removedPlayerDB.ftm = +removedPlayerDB.gp
                  ? (+removedPlayerDB.ftm * (+removedPlayerDB.gp + 1) -
                      +player.ftm || 0) / +removedPlayerDB.gp
                  : 0;

                removedPlayerDB.two_pa = +removedPlayerDB.gp
                  ? (+removedPlayerDB.two_pa * (+removedPlayerDB.gp + 1) -
                      +player.two_pa || 0) / +removedPlayerDB.gp
                  : 0;

                removedPlayerDB.two_pm = +removedPlayerDB.gp
                  ? (+removedPlayerDB.two_pm * (+removedPlayerDB.gp + 1) -
                      +player.two_pm || 0) / +removedPlayerDB.gp
                  : 0;

                removedPlayerDB.three_pa = +removedPlayerDB.gp
                  ? (+removedPlayerDB.three_pa * (+removedPlayerDB.gp + 1) -
                      +player.three_pa || 0) / +removedPlayerDB.gp
                  : 0;

                removedPlayerDB.three_pm = +removedPlayerDB.gp
                  ? (+removedPlayerDB.three_pm * (+removedPlayerDB.gp + 1) -
                      +player.three_pm || 0) / +removedPlayerDB.gp
                  : 0;

                removedPlayerDB.save();
              }
            });
          }

          playerDB.mp =
            (+playerDB.mp * +playerDB.gp -
              (+prevPlayerDB?.minutes || 0) +
              +player.minutes || 0) / +playerDB.gp;

          playerDB.pts =
            (+playerDB.pts * +playerDB.gp -
              (+prevPlayerDB?.pts || 0) +
              +player.pts || 0) / +playerDB.gp;

          playerDB.oreb =
            +playerDB.oreb - (+prevPlayerDB?.oreb || 0) + +player.oreb || 0;
          playerDB.dreb =
            +playerDB.dreb - (+prevPlayerDB?.dreb || 0) + +player.dreb || 0;
          playerDB.reb = (+playerDB.dreb + +playerDB.oreb) / +playerDB.gp;

          playerDB.ast =
            (+playerDB.ast * +playerDB.gp -
              (+prevPlayerDB?.ast || 0) +
              +player.ast || 0) / +playerDB.gp;

          playerDB.stl =
            (+playerDB.stl * +playerDB.gp -
              (+prevPlayerDB?.stl || 0) +
              +player.stl || 0) / +playerDB.gp;

          playerDB.blk =
            (+playerDB.blk * +playerDB.gp -
              (+prevPlayerDB?.blk || 0) +
              +player.blk || 0) / +playerDB.gp;

          playerDB.tov =
            (+playerDB.tov * +playerDB.gp -
              (+prevPlayerDB?.tov || 0) +
              +player.tov || 0) / +playerDB.gp;

          playerDB.fouls =
            (+playerDB.fouls * +playerDB.gp -
              (+prevPlayerDB?.fouls || 0) +
              +player.fouls || 0) / +playerDB.gp;

          playerDB.plus_minus =
            (+playerDB.plus_minus * +playerDB.gp -
              (+prevPlayerDB?.plus_minus || 0) +
              +player.plus_minus || 0) / +playerDB.gp;

          playerDB.fta =
            (+playerDB.fta * +playerDB.gp -
              (+prevPlayerDB?.fta || 0) +
              +player.fta || 0) / +playerDB.gp;

          playerDB.ftm =
            (+playerDB.ftm * +playerDB.gp -
              (+prevPlayerDB?.ftm || 0) +
              +player.ftm || 0) / +playerDB.gp;

          playerDB.two_pa =
            (+playerDB.two_pa * +playerDB.two_pa -
              (+prevPlayerDB?.two_pa || 0) +
              +player.two_pa || 0) / +playerDB.gp;

          playerDB.two_pm =
            (+playerDB.two_pm * +playerDB.gp -
              (+prevPlayerDB?.two_pm || 0) +
              +player.two_pm || 0) / +playerDB.gp;

          playerDB.three_pa =
            (+playerDB.three_pa * +playerDB.gp -
              (+prevPlayerDB?.three_pa || 0) +
              +player.three_pa || 0) / +playerDB.gp;

          playerDB.three_pm =
            (+playerDB.three_pm * +playerDB.gp -
              (+prevPlayerDB?.three_pm || 0) +
              +player.three_pm || 0) / +playerDB.gp;

          playerDB.save();

          if (i === playersStats.length - 1 && game) {
            game.playersStats = playersStats;
            const dateDB = await DateModel.findOne({ date });
            if (!dateDB)
              return res
                .status(400)
                .json({ message: `${dateDB} Date not found` });

            if (dateDB.enemy === enemy && dateDB.time === time) {
              dateDB.enemyScore = enemyScore;
              dateDB.ourScore = ourScore;
            }
            dateDB.save();
            await game.save();
            res.status(201).json({ message: `${game._id} has been updated!` });
          }
        });
      } else {
        const dateDB = await DateModel.findOne({ date });
        if (!dateDB)
          return res.status(400).json({ message: `${date}: Date not found` });

        if (dateDB.enemy === enemy && dateDB.time === time) {
          dateDB.enemyScore = enemyScore;
          dateDB.ourScore = ourScore;
        }
        dateDB.save();
        await game.save();
        res.status(201).json({ message: `${game._id} has been updated!` });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Server error! Please, try again!" });
    }
  }
);

// /api/game/delete-game
router.post(
  "/game/delete-game",
  [],
  async (req: CustomRequest<{ _id: string }>, res: Response) => {
    try {
      let game = await Game.findOne({ _id: req.body._id });
      if (!game)
        return res
          .status(400)
          .json({ message: `Cant find game by id: ${req.body._id}` });

      const { date, enemy } = game;

      const enemyWin = +game.enemyScore > +game.ourScore;
      const enemyTeam = await Team.findOne({ name: enemy });
      if (!enemyTeam)
        return res.status(400).json({ message: `${enemy}: Team not found` });

      const settings = await Settings.findOne(
        {},
        {},
        { sort: { created_at: -1 } }
      );
      if (!settings)
        return res.status(400).json({ message: "Cant get settings" });

      const ourTeam = await Team.findOne({ name: settings.teamName });
      if (!ourTeam)
        return res
          .status(400)
          .json({ message: `${settings.teamName}: Team not found` });

      if (game.ourScore !== 0 && game.enemyScore !== 0) {
        if (enemyWin) {
          enemyTeam.wins = enemyTeam.wins - 1;
          enemyTeam.points = +enemyTeam.points - 2;
          enemyTeam.winRate =
            (+enemyTeam.wins * 100) / (+enemyTeam.wins + +enemyTeam.loses);

          ourTeam.loses = ourTeam.loses - 1;
          ourTeam.points = +ourTeam.points - 1;
          ourTeam.winRate =
            (+ourTeam.wins * 100) / (+ourTeam.wins + +ourTeam.loses);
        } else {
          enemyTeam.loses = enemyTeam.loses - 1;
          enemyTeam.points = +enemyTeam.points - 1;
          enemyTeam.winRate =
            (+enemyTeam.wins * 100) / (+enemyTeam.wins + +enemyTeam.loses);

          ourTeam.wins = ourTeam.wins - 1;
          ourTeam.points = +ourTeam.points - 2;
          ourTeam.winRate =
            (+ourTeam.wins * 100) / (+ourTeam.wins + +ourTeam.loses);
        }
        if (!enemyTeam)
          return res.status(400).json({ message: `${enemy} team not found` });

        enemyTeam.save();
        ourTeam.save();
      }

      game.playersStats.forEach(async (player: PlayerStats) => {
        const playerDB = await Player.findOne({ _id: player._id });

        if (!playerDB)
          return res
            .status(400)
            .json({ message: `${player._id}: Player not found` });

        playerDB.gp -= 1;
        playerDB.mp = +playerDB.gp
          ? (+playerDB.mp * (+playerDB.gp + 1) - +player.minutes || 0) /
            +playerDB.gp
          : 0;

        playerDB.pts = +playerDB.gp
          ? (+playerDB.pts * (+playerDB.gp + 1) - +player.pts || 0) /
            +playerDB.gp
          : 0;

        playerDB.oreb = +playerDB.gp ? +playerDB.oreb - +player.oreb || 0 : 0;
        playerDB.dreb = +playerDB.gp ? +playerDB.dreb - +player.dreb || 0 : 0;
        playerDB.reb = +playerDB.gp
          ? (+playerDB.dreb + +playerDB.oreb) / (+playerDB.gp + 1)
          : 0;

        playerDB.ast = +playerDB.gp
          ? (+playerDB.ast * (+playerDB.gp + 1) - +player.ast || 0) /
            +playerDB.gp
          : 0;

        playerDB.stl = +playerDB.gp
          ? (+playerDB.stl * (+playerDB.gp + 1) - +player.stl || 0) /
            +playerDB.gp
          : 0;

        playerDB.blk = +playerDB.gp
          ? (+playerDB.blk * (+playerDB.gp + 1) - +player.blk || 0) /
            +playerDB.gp
          : 0;

        playerDB.tov = +playerDB.gp
          ? (+playerDB.tov * (+playerDB.gp + 1) - +player.tov || 0) /
            +playerDB.gp
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
          ? (+playerDB.fta * (+playerDB.gp + 1) - +player.fta || 0) /
            +playerDB.gp
          : 0;

        playerDB.ftm = +playerDB.gp
          ? (+playerDB.ftm * (+playerDB.gp + 1) - +player.ftm || 0) /
            +playerDB.gp
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

      res.status(201).json({ message: `${req.body._id} has been removed!` });
    } catch (error: any) {
      res.status(500).json({ message: "Server error! Please, try again!" });
    }
  }
);

// ===================== PLAYER ===================

// /api/player/players
router.post("/player/players", async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Wrong login or password" });
  } catch (error: any) {
    res.status(500).json({ message: "Server error! Please, try again!" });
  }
  const players = await Player.find({});

  if (!players)
    return res.status(400).json({ message: "There are no active players" });

  res.json(players);
});

// /api/player/birthDay
router.post("/player/birthDay", async (req: Request, res: Response) => {
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
    (player: PlayerType) =>
      player.birthDate.slice(5) === todayToLocalUsedStr.slice(5)
  );

  res.json(birthDays);
});

// /api/player/id
router.post(
  "/player/id",
  async (req: CustomRequest<{ _id: string }>, res: Response) => {
    const { _id } = req.body;
    const playerDB = await Player.findOne({ _id });

    if (!playerDB)
      return res.status(400).json({ message: "There are no active players" });

    res.json(playerDB);
  }
);

// ===================== TEAM ===================

router.post("/team/teams", [], async (req: Request, res: Response) => {
  const teams = await Team.find({});
  if (!teams) return res.status(400).json({ message: "Teams not found" });
  res.json(teams);
});

router.post(
  "/team/edit-table-info",
  [],
  async (req: CustomRequest<TeamType>, res: Response) => {
    const team = await Team.findOne({ _id: req.body._id });
    if (!team) return res.status(400).json({ message: "Team not found" });

    team.wins = req.body.wins;
    team.loses = req.body.loses;
    team.points = req.body.wins * 2 + req.body.loses * 1;
    team.winRate = (+team.wins * 100) / (+team.wins + +team.loses);
    await team.save();
    res.json({ ...team });
  }
);

// ================= SETTINGS ==================

router.post("/settings", [], async (req: Request, res: Response) => {
  const settings = await Settings.findOne({}, {}, { sort: { created_at: -1 } });
  if (!settings)
    return res.status(400).json({ message: "Cant get to settings db table" });
  res.json(settings);
});

router.post(
  "/settings/save",
  [],
  async (req: CustomRequest<SettingsType>, res: Response) => {
    const settings = await Settings.findOne(
      {},
      {},
      { sort: { created_at: -1 } }
    );
    if (!settings)
      return res.status(400).json({ message: "Cant get to settings db table" });

    settings.playoffsStart = req.body.playoffsStart;
    settings.enableCalendarScrollMode = req.body.enableCalendarScrollMode;
    settings.teamName = req.body.teamName;
    await settings.save();
    res.json({ ...settings });
  }
);

// ================= PLAYOFFS ==================

router.post("/bracket/build", [], async (req: Request, res: Response) => {
  // clean before start -> get all teams -> take 8 best of them -> build Playoffs matchups
  await PlayoffsMatchup.deleteMany();

  const teams = await Team.find({});
  teams.sort(
    (a: TeamType, b: TeamType) => b.points - a.points || b.winRate - a.winRate
  );
  const bestA = teams.filter((t: TeamType) => t.group === "A").slice(0, 4);
  const bestB = teams.filter((t: TeamType) => t.group === "B").slice(0, 4);

  bestA.forEach(async (t: TeamType, index: number) => {
    if (index < bestA.length / 2) {
      const match = new PlayoffsMatchup({
        team1: t.name,
        team2: bestA[bestA.length - (index + 1)].name,
        winner: "",
      });
      await match.save();
    }
  });
  bestB.forEach(async (t: TeamType, index: number) => {
    if (index < bestB.length / 2) {
      const match = new PlayoffsMatchup({
        team1: t.name,
        team2: bestB[bestB.length - (index + 1)].name,
        winner: "",
      });
      await match.save();
    }
  });

  const settings = await Settings.findOne({}, {}, { sort: { created_at: -1 } });
  if (!settings) return res.status(400).json({ message: "Where is settings?" });
  settings.playoffsBracketBuilt = true;
  await settings.save();
  res.json({ message: "Bracket has been succesefully built!" });
});

router.post("/bracket/get", [], async (req: Request, res: Response) => {
  const matches = await PlayoffsMatchup.find({});
  if (!matches)
    return res.status(400).json({ message: "No matches in playoffs table" });
  res.json(matches);
});

router.post("/bracket/clear", [], async (req: Request, res: Response) => {
  const settings = await Settings.findOne({}, {}, { sort: { created_at: -1 } });
  if (!settings) return res.status(400).json({ message: "Where is settings?" });

  settings.playoffsBracketBuilt = false;
  await PlayoffsMatchup.deleteMany();
  settings.save();
  res.json("Playoffs bracket has been cleared!");
});

// ==================== WARNING ==================
//DO NOT UNCOMMENT THIS IF YOU DONT WANT TO BREAK EVERYTHNIG
// CLEAN ALL PLAYERS STATS

// // /api/game/edit-game
// router.post("/players/clean", [], async (req: CustomRequest<UserLoginData>, res: Response) => {
//   try {
//     const players = await Player.find({});
//     if (!players) return res.status(400).json({ message: "Cant get all players" });
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
//   } catch (error: any) {
//     res.status(500).json({ message: "Server error! Please, try again!" });
//   }

export default router;
