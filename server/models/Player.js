import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PlayerSchema = new Schema({
  name: String,
  position: String,
  image: String,
  age: { type: Number, min: 0 },
  birthDate: Date,
  number: String,
  info: String,
  gp: Number,
  gs: Number,
  mp: Number,
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
});

export default model("Player", PlayerSchema);
