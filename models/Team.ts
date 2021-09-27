import { Schema, model, Document } from "mongoose";

interface Team extends Document {
  _id?: string;
  group: string;
  loses: number;
  name: string;
  points: number;
  winRate: number;
  wins: number;
  __v?: number;
}

const schema = new Schema<Team>({
  name: { type: String, required: true, unique: true },
  wins: { type: Number, required: true, default: 0 },
  loses: { type: Number, required: true, default: 0 },
  group: { type: String, default: "A" },
  points: { type: Number, required: true, default: 0 },
  winRate: { type: Number, required: true, default: 0 },
});

export default model<Team>("Team", schema);
