import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

interface IUser {
  _id: string;
  login: string;
  password: string;
}

const schema = new Schema<IUser>({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: Types.ObjectId, ref: "Status" },
});

export default model<IUser>("User", schema);
