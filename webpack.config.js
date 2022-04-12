import path from "path";
import fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import "dotenv/config";

const appDirectory = fs.realpathSync(process.cwd());

const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath);

const host = process.env.HOST || "localhost";

const clientside = {
  mode: "development",
  entry: resolveAppPath("./client/src"),
  output: {
    filename: "static/js/bundle.js",
  },
  devServer: {
    static: {
      directory: resolveAppPath("./client/public"),
    },
    compress: true,
    hot: true,
    host,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: resolveAppPath("./client/src"),
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveAppPath("./client/public/index.html"),
    }),
  ],
};

export default clientside;
