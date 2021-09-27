import { Schema, model, Document } from "mongoose";

interface DateType extends Document {
  _id?: string | undefined;
  date: string;
  enemy: string;
  enemyScore?: number | undefined;
  ourScore?: number | undefined;
  time: string;
  __v?: number | undefined;
}

const schema = new Schema<DateType>({
  enemy: { type: String, required: true },
  ourScore: { type: Number },
  enemyScore: { type: Number },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

export default model<DateType>("Date", schema);
