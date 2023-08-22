const path = require("path");
const ESlintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined,
    filename: "static/js/main.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.styl/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        //webpack 将按照默认条件，自动地在 resource 和 inline 之间进行选择：小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型。
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 6 * 1024, //6kb
          },
        },
        generator: {
          filename: "static/images/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?|map4|map3|avi)$/,
        type: "asset/resource",

        generator: {
          filename: "static/fonts/[hash:8][ext][query]",
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader", // 排除node_modules代码不编译
        exclude: "/node_modules/",
      },
    ],
  },
  plugins: [
    new ESlintWebpackPlugin({
      context: path.resolve(__dirname, "src"),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  mode: "development",
  devServer: {
    host: "localhost",
    port: "3001",
    open: true,
  },
};
