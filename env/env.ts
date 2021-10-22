import dotenv from "dotenv";
import path from "path";

const p = path.resolve(
  __dirname,
  `../../.env.${
    typeof process.env.NODE_ENV === "string"
      ? process.env.NODE_ENV
      : "development"
  }`
);

const res = dotenv.config({
  debug: true,
  path: p,
});
