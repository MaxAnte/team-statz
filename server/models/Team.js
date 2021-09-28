import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  wins: { type: Number, required: true, default: 0 },
  loses: { type: Number, required: true, default: 0 },
  group: { type: String, default: "A" },
  points: { type: Number, required: true, default: 0 },
  winRate: { type: Number, required: true, default: 0 },
});

export default model("Team", schema);
