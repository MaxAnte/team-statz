import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface IPlayoffsMatchup {
  _id: string;
  team1: string;
  team2: string;
  winner: string;
}

const schema = new Schema<IPlayoffsMatchup>({
  team1: { type: String, required: true, default: "" },
  team2: { type: String, required: true, default: "" },
  winner: { type: String, default: "" },
});

export default model<IPlayoffsMatchup>("PlayoffsMatchup", schema);
