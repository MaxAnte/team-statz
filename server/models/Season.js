import mongoose from "mongoose";
const { Schema, model } = mongoose;

const SeasonSchema = new Schema({
  name: String,
  startDate: Date,
  endDate: Date,
});

export default model("Season", SeasonSchema);
