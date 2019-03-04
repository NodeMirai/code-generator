const path = require('path')
const { pageModel } = require('../config')

const pathMap: any = {
  '-t': {
    outPath: '/Users/qudian/app-wx-vipluxury/src/pack1/pages',
    componentPath: '@components',
    resolveComponentPath: '/Users/qudian/app-wx-vipluxury/src/components'
  }
}

const {
  componentPath = './src/component',
  resolveComponentPath = path.resolve(componentPath),
  outPath = path.resolve('./dist')
} = pathMap[pageModel]

const modelPath = path.resolve('./src/pageModel')  //  用于配置输出页面的页面模型
const stylePath = path.resolve('./src/styleModel')

export default {
  componentPath,
  resolveComponentPath,
  modelPath,
  outPath,
  stylePath,
  modalLog: 'modalLog.txt'
}