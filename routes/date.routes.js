const { Router } = require("express");
const { validationResult } = require("express-validator");
const Date = require("../models/Date");

const router = Router();

// /api/game/add-date
router.post("/add-date", [], async (req, res) => {
  try {
    const date = new Date(req.body);

    await date.save();

    res.status(201).json({ message: `${date} has been added!` });
  } catch (e) {
    console.log("Error:", e.message);
    res.status(500).json({ message: "Server error! Please, try again!" });
  }
});

// /api/game/games
router.post("/dates", async (req, res) => {
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

module.exports = router;
