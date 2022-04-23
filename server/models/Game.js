import mongoose from "mongoose";
const { Schema, model } = mongoose;

const GameSchema = new Schema({
  date: Date,
  status: String,
  homeTeam: { type: Schema.Types.ObjectId, ref: "Team" },
  guestTeam: { type: Schema.Types.ObjectId, ref: "Team" },
  quarters: [{ home: Number, guest: Number }],
  // playersStats: [{ type: Schema.Types.ObjectId, ref: "PlayerStats" }],
});

export default model("Game", GameSchema);
