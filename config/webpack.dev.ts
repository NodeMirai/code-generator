/**
 * 多页面webpack配置项
 * 1. 获取dist下每个文件的路径，用于传入entry多页面入口
 * 2. 使用webpack-dev-server
 */
import path = require("path");
import * as shell from "shelljs";
import HtmlWebpackPlugin = require("html-webpack-plugin");
const px2rem = require("postcss-px2rem");
const autoprefixer = require("autoprefixer");
import { Postfix } from '../src/class/constant';
import { pageModel } from './index';

const outputPath = path.resolve(__dirname, "../dist");
const entry: any = {};
const htmlPluginList: Array<HtmlWebpackPlugin> = [];

shell.cd(outputPath);
shell.ls().forEach(filename => {
  entry[filename + "/" + filename] = `${outputPath}/${filename}/index${pageModel !== '-t' ? Postfix.JSX: Postfix.JS }`;
  htmlPluginList.push(
    new HtmlWebpackPlugin({
      filename: filename + "/index.html",
      chunks: [filename],
      template: path.resolve(__dirname, "./index.ejs"),
      templateParameters: {
        js: filename
      }
    })
  );
});

const config: any = {
  devtool: "cheap-module-eval-source-map",
  mode: "development",
  entry,
  output: {
    path: path.resolve("../build"),
    filename: "[name].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "../build"),
    compress: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [px2rem({ remUnit: 37.5 }), autoprefixer()],
              sourceMap: true,
            }
          },
          "sass-loader",
        ]
      },
      { test: /\.ejs$/, loader: "ejs-loader" }
    ]
  },
  plugins: [...htmlPluginList]
};

export default config;
