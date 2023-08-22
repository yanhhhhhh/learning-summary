const path = require("path");
const ESlintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};
module.exports = {
  entry: "./src/main.js", //相对于当前终端所在文件路径进行拼接
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/main.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      {
        test: /\.styl/,
        use: getStyleLoaders("stylus-loader"),
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
      context: path.resolve(__dirname, "../src"),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
    new CssMinimizerPlugin(), //css压缩
  ],
  mode: "production",
};
