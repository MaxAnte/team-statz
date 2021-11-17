import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface IPlayer {
  _id: string;
  name: string;
  position: string;
  image_thumb: string;
  age: number;
  birthDate: string;
  number: number;
  gp: number;
  gs: number;
  mp: number;
  pts: number;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  blk: number;
  stl: number;
  plus_minus: number;
  fta: number;
  ftm: number;
  two_pa: number;
  two_pm: number;
  three_pa: number;
  three_pm: number;
  tov: number;
  fouls: number;
  bestInPts: boolean;
  bestInReb: boolean;
  bestInAst: boolean;
  bestInBlk: boolean;
  bestInStl: boolean;
}

const schema = new Schema<IPlayer>({
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

export default model<IPlayer>("Player", schema);
