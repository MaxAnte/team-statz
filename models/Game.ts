import { Schema, model, Types, Document } from "mongoose";
import { PlayerStats, Quarter } from "../client/src/context/app.types";

interface Game extends Document {
  _id: string;
  date: string;
  enemy: string;
  enemyScore: number;
  ourScore: number;
  pending: boolean;
  playersStats: PlayerStats[];
  quarters: Quarter[];
  time: string;
  __v?: number;
}

const schema = new Schema<Game>({
  enemy: { type: String, required: true },
  ourScore: { type: Number, default: 0, required: true },
  enemyScore: { type: Number, default: 0, required: true },
  quarters: [{ our: Number, enemy: Number }],
  date: { type: String, required: true },
  time: { type: String, required: true },
  pending: { type: Boolean, required: true, default: true },
  playersStats: [
    {
      pID: { type: Types.ObjectId, ref: "Player" },
      pts: { type: Number, default: 0 },
      oreb: { type: Number, default: 0 },
      dreb: { type: Number, default: 0 },
      ast: { type: Number, default: 0 },
      blk: { type: Number, default: 0 },
      stl: { type: Number, default: 0 },
      plus_minus: { type: Number, default: 0 },
      two_pa: { type: Number, default: 0 },
      two_pm: { type: Number, default: 0 },
      three_pa: { type: Number, default: 0 },
      three_pm: { type: Number, default: 0 },
      fta: { type: Number, default: 0 },
      ftm: { type: Number, default: 0 },
      tov: { type: Number, default: 0 },
      fouls: { type: Number, default: 0 },
      minutes: { type: Number, default: 0 },
      coordinates: [{ x: Number, y: Number, miss: Boolean }],
    },
  ],
});

export default model<Game>("Game", schema);
