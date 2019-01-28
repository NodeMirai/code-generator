const path = require('path')

const componentPath = './src/component'
const resolveComponentPath = path.resolve('./src/component')
const modelPath = path.resolve('./src')  //  未来需要更改为外部配置
const outPath = path.resolve('./dist')

module.exports = {
  componentPath,
  resolveComponentPath,
  modelPath,
  outPath,
}