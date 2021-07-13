const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  enemy: { type: String, required: true },
  ourScore: { type: Number, required: true },
  enemyScore: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  playersStats: [
    {
      pID: { type: Types.ObjectId, ref: "Player" },
      pts: { type: Number },
      oreb: { type: Number },
      dreb: { type: Number },
      ast: { type: Number },
      blk: { type: Number },
      stl: { type: Number },
      two_pa: { type: Number },
      two_pm: { type: Number },
      three_pa: { type: Number },
      three_pm: { type: Number },
      fta: { type: Number },
      ftm: { type: Number },
      tov: { type: Number },
      fouls: { type: Number },
      minutes: { type: Number },
      coordinates: [{ x: Number, y: Number, miss: Boolean }],
    },
  ],
});

module.exports = model("Game", schema);
