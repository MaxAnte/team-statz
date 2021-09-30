import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface ISettings {
  _id: string;
  playoffsStart: string;
  playoffsBracketBuilt: boolean;
  enableCalendarScrollMode: boolean;
}

const schema = new Schema<ISettings>({
  playoffsStart: { type: String },
  playoffsBracketBuilt: { type: Boolean, default: false },
  enableCalendarScrollMode: { type: Boolean, default: false },
});

export default model<ISettings>("Settings", schema);
