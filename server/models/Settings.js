import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schema = new Schema({
  playoffsStart: { type: String },
  playoffsBracketBuilt: { type: Boolean, default: false },
  enableCalendarScrollMode: { type: Boolean, default: false },
});

export default model("Settings", schema);
