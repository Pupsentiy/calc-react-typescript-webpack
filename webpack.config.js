const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  devServer: {
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      { test: /\.(html)$/, use: ["html-loader"] },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        resolve: {
          extensions: [".tsx", ".ts", ".js",".scss"],
        },
      },
      {
        test: /\.(ts|tsx)$/,
        enforce: "pre",
        loader: "eslint-loader",
        include: path.resolve(__dirname, "./src/**/*.ts"),
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
        include: path.resolve(__dirname, "./src/**/*.ts"),
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(ttf?otf?|eot|woff|woff2)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/index.html"),
    }),
  ],
};
