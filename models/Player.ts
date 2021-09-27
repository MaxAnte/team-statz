import { Schema, model, Document } from "mongoose";
import { Coord } from "../client/src/context/app.types";

interface Player extends Document {
  _id: string;
  ast: number;
  blk: number;
  coordinates: Coord[];
  dreb: number;
  fouls: number;
  fta: number;
  ftm: number;
  minutes: number;
  mp: number;
  gp: number;
  oreb: number;
  reb: number;
  plus_minus: number;
  pts: number;
  stl: number;
  three_pa: number;
  three_pm: number;
  tov: number;
  two_pa: number;
  two_pm: number;
  birthDate: string;
  __v?: number;
}

const schema = new Schema<Player>({
  name: { type: String, required: true },
  position: { type: String },
  image_thumb: { type: String },
  age: { type: Number },
  birthDate: { type: String },
  number: { type: Number },
  gp: { type: Number, default: 0 },
  gs: { type: Number, default: 0 },
  mp: { type: Number, default: 0 },
  pts: { type: Number, default: 0 },
  oreb: { type: Number, default: 0 },
  dreb: { type: Number, default: 0 },
  reb: { type: Number, default: 0 },
  ast: { type: Number, default: 0 },
  blk: { type: Number, default: 0 },
  stl: { type: Number, default: 0 },
  plus_minus: { type: Number, default: 0 },
  fta: { type: Number, default: 0 },
  ftm: { type: Number, default: 0 },
  two_pa: { type: Number, default: 0 },
  two_pm: { type: Number, default: 0 },
  three_pa: { type: Number, default: 0 },
  three_pm: { type: Number, default: 0 },
  tov: { type: Number, default: 0 },
  fouls: { type: Number, default: 0 },
  bestInPts: { type: Boolean, default: false },
  bestInReb: { type: Boolean, default: false },
  bestInAst: { type: Boolean, default: false },
  bestInBlk: { type: Boolean, default: false },
  bestInStl: { type: Boolean, default: false },
});

export default model<Player>("Player", schema);
