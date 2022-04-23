import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import routes from "./router/index.js";

const server = express();

server.use(express.json({ extended: true }));

server.use(cors());

server.use("/api", routes);

server.get("/", (req, res) => {
  console.log("Wassup?");
});

mongoose.connect(process.env.MONGO_URI, () => console.log("Connected to DB!"));

server.listen(process.env.PORT, () => {
  console.log(`We are live at ${process.env.PORT} port`);
});
