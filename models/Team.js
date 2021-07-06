const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  wins: { type: Number, required: true },
  loses: { type: Number, required: true },
});

module.exports = model("Team", schema);
