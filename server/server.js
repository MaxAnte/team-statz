import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./router/index.js";

const server = express();

server.use(express.json({ extended: true }));

server.use("/api", routes);

server.get("/", (req, res) => {
  console.log("Wassup?");
});

async function start() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      () => {
        console.log("Connected to DB!");
      }
    );
    server.listen(process.env.PORT, () => {
      console.log(`We are line at ${process.env.PORT} port`);
    });
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}

start();
