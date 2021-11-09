const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  position: { type: String },
  image_thumb: { type: String },
  age: { type: Number },
  birthDate: { type: String },
  number: { type: Number },
  gp: { type: Number, default: 0 },
  gs: { type: Number, default: 0 },
  mp: { type: Number, default: 0 },
  pts: { type: Number, default: 0 },
  oreb: { type: Number, default: 0 },
  dreb: { type: Number, default: 0 },
  reb: { type: Number, default: 0 },
  ast: { type: Number, default: 0 },
  blk: { type: Number, default: 0 },
  stl: { type: Number, default: 0 },
  plus_minus: { type: Number, default: 0 },
  fta: { type: Number, default: 0 },
  ftm: { type: Number, default: 0 },
  two_pa: { type: Number, default: 0 },
  two_pm: { type: Number, default: 0 },
  three_pa: { type: Number, default: 0 },
  three_pm: { type: Number, default: 0 },
  tov: { type: Number, default: 0 },
  fouls: { type: Number, default: 0 },
  bestInPts: { type: Boolean, default: false },
  bestInReb: { type: Boolean, default: false },
  bestInAst: { type: Boolean, default: false },
  bestInBlk: { type: Boolean, default: false },
  bestInStl: { type: Boolean, default: false },
});

module.exports = model("Player", schema);