const { Router } = require("express");
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();

// /api/auth/login
router.post(
  "/login",
  [
    // check("email", "Wrong email format!").normalizeEmail().isEmail(),
    check("login", "Wrong login!").isLength({ min: 5 }),
    check("password", "Minimum 6 symbols").isLength({ min: 5 }),
  ],
  async (req, res) => {
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
  "/register",
  [
    // check("email", "Wrong email format!").isEmail(),
    check("login", "Wrong login!").isLength({ min: 5 }),
    check("password", "Minimum 5 symbols").isLength({ min: 5 }),
  ],
  async (req, res) => {
    console.log("Req body:", req.body);
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

module.exports = router;
