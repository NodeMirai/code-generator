const path = require('path')

const componentPath = './src/component'
const resolveComponentPath = path.resolve(componentPath)
const modelPath = path.resolve('./src/pageModel')  //  未来需要更改为外部配置
const outPath = path.resolve('./dist')

module.exports = {
  componentPath,
  nativeComponentPath: '',
  resolveComponentPath,
  modelPath,
  outPath,
}