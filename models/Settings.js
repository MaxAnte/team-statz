const { Schema, model } = require("mongoose");

const schema = new Schema({
  playoffsStart: { type: String },
  playoffsBracketBuilt: { type: Boolean, default: false },
});

module.exports = model("Settings", schema);
