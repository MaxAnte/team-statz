import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface ITeam {
  _id: string;
  name: string;
  wins: number;
  loses: number;
  group: string;
  points: number;
  winRate: number;
}

const schema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  wins: { type: Number, required: true, default: 0 },
  loses: { type: Number, required: true, default: 0 },
  group: { type: String, default: "A" },
  points: { type: Number, required: true, default: 0 },
  winRate: { type: Number, required: true, default: 0 },
});

export default model<ITeam>("Team", schema);
