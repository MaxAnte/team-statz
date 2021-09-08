const { Schema, model } = require("mongoose");

const schema = new Schema({
  playoffsStart: { type: String },
});

module.exports = model("Settings", schema);
