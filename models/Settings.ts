import { Schema, model, Document } from "mongoose";

interface Settings extends Document {
  _id?: string;
  enableCalendarScrollMode: boolean;
  playoffsBracketBuilt: boolean;
  playoffsStart: string;
  __v?: number;
}

const schema = new Schema<Settings>({
  playoffsStart: { type: String },
  playoffsBracketBuilt: { type: Boolean, default: false },
  enableCalendarScrollMode: { type: Boolean, default: false },
});

export default model<Settings>("Settings", schema);
