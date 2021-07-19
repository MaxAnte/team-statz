const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  wins: { type: Number, required: true, default: 0 },
  loses: { type: Number, required: true, default: 0 },
});

module.exports = model("Team", schema);
