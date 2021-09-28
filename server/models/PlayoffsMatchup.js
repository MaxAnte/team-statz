import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schema = new Schema({
  team1: { type: String, required: true, default: "" },
  team2: { type: String, required: true, default: "" },
  winner: { type: String, default: "" },
});

export default model("PlayoffsMatchup", schema);
