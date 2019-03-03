const path = require('path')

const componentPath = './src/component'   // 组件资源位置
const resolveComponentPath = path.resolve(componentPath)
const modelPath = path.resolve('./src/pageModel')  //  用于配置输出页面的页面模型
const stylePath = path.resolve('./src/styleModel')
const outPath = '/Users/qudian/app-wx-vipluxury/src/pack1/pages' // path.resolve('./dist')  // 输出文件位置

export default {
  componentPath,
  resolveComponentPath,
  modelPath,
  outPath,
  stylePath,
  modalLog: 'modalLog.txt'
}