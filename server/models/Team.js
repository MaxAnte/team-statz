import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TeamSchema = new Schema({
  name: String,
  logo: String,
  players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
  group: { type: String, default: "A" },
  wins: { type: Number, min: 0 },
  losses: { type: Number, min: 0 },
  winRate: { type: Number, default: 100 },
  points: { type: Number, min: 0 },
  games: { type: Number, min: 0 },
});

export default model("Team", TeamSchema);
