import "./env/env";

import fs from "fs";
import path from "path";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import nodeExternals from "webpack-node-externals";

console.log({
  cwd: process.cwd(),
  NODE_ENV: process.env.NODE_ENV,
  BUILD_ENV: process.env.BUILD_ENV,
  APP_PROTOCOL: process.env.APP_PROTOCOL,
  NODE_SERVER_IP: process.env.NODE_SERVER_IP,
  APP_SITE_URL: process.env.APP_SITE_URL,
  APP_ASSETS_URL: process.env.APP_ASSETS_URL,
});

const clientside = () => ({
  target: "node",
  externals: [nodeExternals()],
  externalsPresets: {
    node: true,
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./client/src/index.tsx",
  optimization: {
    minimize: process.env.NODE_ENV === "production",
    moduleIds: "named",
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, "build/public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/u,
        exclude: /node_modules/u,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: "./client/src/**/*",
      },
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer:
    process.env.BUILD_ENV !== "development"
      ? {}
      : {
          host: process.env.NODE_SERVER_IP,
          port: 3000,
          hot: true,
          headers: {
            "X-Custom-Header": "yes",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept",
          },
        },
});

const serverside = () => ({
  target: "node",
  externals: [nodeExternals()],
  externalsPresets: {
    node: true,
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./server/server.tsx",
  optimization: {
    minimize: process.env.NODE_ENV === "production",
    moduleIds: "named",
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          mangle: process.env.BUILD_ENV === "production",
        },
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.server.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/u,
        exclude: /node_modules/u,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
});

const configs =
  process.env.NODE_ENV === "production"
    ? [clientside(), serverside()]
    : clientside();

export default configs;
