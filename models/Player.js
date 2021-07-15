const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  position: { type: String },
  image_thumb: { type: String },
  age: { type: Number },
  number: { type: Number },
  gp: { type: Number },
  gs: { type: Number },
  mp: { type: Number },
  pts: { type: Number },
  oreb: { type: Number },
  dreb: { type: Number },
  reb: { type: Number },
  ast: { type: Number },
  blk: { type: Number },
  stl: { type: Number },
  fta: { type: Number },
  ftm: { type: Number },
  two_pa: { type: Number },
  two_pm: { type: Number },
  three_pa: { type: Number },
  three_pm: { type: Number },
  tov: { type: Number },
  fouls: { type: Number },
  bestInPts: { type: Boolean, default: false },
  bestInReb: { type: Boolean, default: false },
  bestInAst: { type: Boolean, default: false },
  bestInBlk: { type: Boolean, default: false },
  bestInStl: { type: Boolean, default: false },
});

module.exports = model("Player", schema);
