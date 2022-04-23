import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PlayerStatsSchema = new Schema({
  playerId: { type: Schema.Types.ObjectId, ref: "Player" },
  gameId: { type: Schema.Types.ObjectId, ref: "Game" },
  starter: { type: Boolean, default: false },
  pts: Number,
  oreb: Number,
  dreb: Number,
  ast: Number,
  blk: Number,
  stl: Number,
  plusMinus: Number,
  ftA: Number,
  ftM: Number,
  twoPA: Number,
  twoPM: Number,
  threePA: Number,
  threePM: Number,
  tov: Number,
  fouls: Number,
  minutes: [Number],
  coordinates: [{ x: Number, y: Number, made: Boolean }],
});

export default model("PlayerStats", PlayerStatsSchema);
