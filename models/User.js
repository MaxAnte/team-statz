const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: Types.ObjectId, ref: "Status" },
});

module.exports = model("User", schema);
