import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schema = new Schema({
  enemy: { type: String, required: true },
  ourScore: { type: Number },
  enemyScore: { type: Number },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

export default model("Date", schema);
