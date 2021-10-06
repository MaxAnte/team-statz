import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface ISettings {
  _id: string;
  teamName: string;
  teamLogo: string;
  playoffsStart: string;
  playoffsBracketBuilt: boolean;
  enableCalendarScrollMode: boolean;
}

const schema = new Schema<ISettings>({
  teamName: { type: String, required: true },
  teamLogo: { type: String },
  playoffsStart: { type: String },
  playoffsBracketBuilt: { type: Boolean, default: false },
  enableCalendarScrollMode: { type: Boolean, default: false },
});

export default model<ISettings>("Settings", schema);
