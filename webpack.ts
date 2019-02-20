import webpack = require('webpack')
import webpackDevConfig from './config/webpack.dev'

const compiler = webpack(webpackDevConfig)

compiler.run((err: any, stats: any) => {
  if (stats.hasErrors())
  console.log(stats.toString())
})