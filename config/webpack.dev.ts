/**
 * 多页面webpack配置项
 * 1. 获取dist下每个文件的路径，用于传入entry多页面入口
 * 2. 使用webpack-dev-server
 */
import path = require('path')
import * as shell from 'shelljs'
import HtmlWebpackPlugin = require('html-webpack-plugin') 

const outputPath = path.resolve(__dirname, '../dist')
const entry: any = {}
const htmlPluginList: Array<HtmlWebpackPlugin> = []

shell.cd(outputPath)
shell.ls('*.jsx').forEach(filename => {
  const name = filename.slice(0, -4)
  entry[name] = outputPath + '/' + filename
  htmlPluginList.push(
    new HtmlWebpackPlugin({
      filename: name + '.html',
      chunks: [name]
    })
  )
})

const config: any = {
  devtool: 'source-map',
  mode: 'development',
  entry,
  output: {
    path: path.resolve('../build'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, '../build'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ],
  },
  plugins: [
    ...htmlPluginList
  ]
}

export default config