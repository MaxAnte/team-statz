import { Schema, model, Document } from "mongoose";

interface PlayoffsMatchup extends Document {
  _id: string;
  team1: string;
  team2: string;
  winner: string;
  __v?: number;
}

const schema = new Schema<PlayoffsMatchup>({
  team1: { type: String, required: true, default: "" },
  team2: { type: String, required: true, default: "" },
  winner: { type: String, default: "" },
});

export default model<PlayoffsMatchup>("PlayoffsMatchup", schema);
