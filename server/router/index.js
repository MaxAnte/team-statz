import { Router } from "express";
import UserModel from "../models/User.js";
import SeasonModel from "../models/Season.js";
import PlayerModel from "../models/Player.js";
import PlayerStatsModel from "../models/PlayerStats.js";
import TeamModel from "../models/Team.js";
import GameModel from "../models/Game.js";

const router = Router();

router.get("/users", async (req, res) => {
  const users = await UserModel.find({});

  if (!users) return res.status(400).json({ message: "There are no users" });

  res.json(users);
});

router.post("/user", async (req, res) => {
  const user = new UserModel(req.body);
  await user.save();
  res.json(user);
});

router.get("/seasons", async (req, res) => {
  const seasons = await SeasonModel.find({});

  if (!seasons)
    return res.status(400).json({ message: "There are no seasons" });

  res.json(seasons);
});

router.post("/season", async (req, res) => {
  const season = new SeasonModel(req.body);
  await season.save();
  res.json(season);
});

router.get("/players", async (req, res) => {
  const players = await PlayerModel.find({});

  if (!players)
    return res.status(400).json({ message: "There are no players" });

  res.json(players);
});

router.post("/player", async (req, res) => {
  const player = new PlayerModel(req.body);
  await player.save();
  res.json(player);
});

router.get("/playersStats", async (req, res) => {
  const playersStats = await PlayerStatsModel.find({});

  if (!playersStats)
    return res.status(400).json({ message: "There are no playersStats" });

  res.json(playersStats);
});

router.post("/playerStats", async (req, res) => {
  const playerStats = new PlayerStatsModel(req.body);
  await playerStats.save();
  res.json(playerStats);
});

router.get("/teams", async (req, res) => {
  const teams = await TeamModel.find({});

  if (!teams) return res.status(400).json({ message: "There are no teams" });

  res.json(teams);
});

router.post("/team", async (req, res) => {
  const teams = new TeamModel(req.body);
  await teams.save();
  res.json(teams);
});

router.get("/games", async (req, res) => {
  const games = await GameModel.find({});

  if (!games) return res.status(400).json({ message: "There are no games" });

  res.json(games);
});

router.post("/game", async (req, res) => {
  const game = new GameModel(req.body);
  await game.save();
  res.json(game);
});

export default router;
