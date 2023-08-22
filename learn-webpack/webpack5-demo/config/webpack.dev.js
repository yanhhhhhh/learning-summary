const path = require("path");
module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined, // 开发模式没有输出，不需要指定输出目录
    filename: "js/main.js",
  },
  module: {
    rules: [],
  },
  plugins: [],
  devServer: {
    host: "localhost",
    port: "3001",
    open: true,
  },
  mode: "development",
};
