import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  login: String,
  password: String,
  token: String,
});

export default model("User", UserSchema);
