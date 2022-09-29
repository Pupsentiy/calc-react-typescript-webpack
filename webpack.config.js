const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

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
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        resolve: {
          extensions: [".tsx", ".ts", ".js"],
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
        loader: ["babel-loader", "eslint-loader"],
        include: path.resolve(__dirname, "./src/**/*.ts"),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/index.html"),
    }),
    new StyleLintPlugin({
      files: ["**/*.{html,css,sass,scss}"],
      fix: false,
      cache: true,
      emitErrors: true,
      failOnError: false,
    }),
  ],
};
