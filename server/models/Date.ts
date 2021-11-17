import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface IDate {
  _id: string;
  enemy: string;
  ourScore?: number;
  enemyScore?: number;
  date: string;
  time: string;
}

const schema = new Schema<IDate>({
  enemy: { type: String, required: true },
  ourScore: { type: Number },
  enemyScore: { type: Number },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

export default model<IDate>("Date", schema);
