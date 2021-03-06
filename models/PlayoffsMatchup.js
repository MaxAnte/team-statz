const { Schema, model } = require("mongoose");

const schema = new Schema({
  team1: { type: String, required: true, default: "" },
  team2: { type: String, required: true, default: "" },
  winner: { type: String, default: "" },
});

module.exports = model("PlayoffsMatchup", schema);
