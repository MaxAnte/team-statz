import express from "express";
import config from "config";
import mongoose from "mongoose";
import path from "path";
import router from "./routes/server.routes.js";

const app = express();

app.use(express.json({ extended: true }));

app.use("/api", router);

console.log("NODE_ENV:", process.env.NODE_ENV);

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
