const path = require('path')

const componentPath = './src/component'   // 组件资源位置
const resolveComponentPath = path.resolve(componentPath)
const modelPath = path.resolve('./src/pageModel')  //  用于配置输出页面的页面模型
const outPath = path.resolve('./dist')  // 输出文件位置

module.exports = {
  componentPath,
  nativeComponentPath: '',
  resolveComponentPath,
  modelPath,
  outPath,
}