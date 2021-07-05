const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  id: { type: Types.ObjectId, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  wins: { type: Number, required: true },
  loses: { type: Number, required: true },
});

module.exports = model("Team", schema);
