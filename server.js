const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/team", require("./routes/team.routes"));
app.use("/api/game", require("./routes/game.routes"));
app.use("/api/player", require("./routes/player.routes"));
app.use("/api/date", require("./routes/date.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT =
  (process.env.NODE_ENV === "development"
    ? config.get("port")
    : process.env.PORT) || 5000;
const MONGO_URI =
  process.env.NODE_ENV === "development"
    ? config.get("mongoUri")
    : process.env.MONGO_URI;

async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App is running on port:${PORT}!`));
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}

start();
