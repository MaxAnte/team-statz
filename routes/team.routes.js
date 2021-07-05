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

router.post("/team", [], async (req, res) => {
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

  const { name } = req.body;

  const team = await Team.findOne({ name });

  if (!team) return res.status(400).json({ message: "Teams not found" });

  res.json({ ...team });
});

module.exports = router;
