import { Schema, model, Types, Document } from "mongoose";

interface User extends Document {
  login: string;
  password: string;
}

const schema = new Schema<User>({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: Types.ObjectId, ref: "Status" },
});

export default model<User>("User", schema);
