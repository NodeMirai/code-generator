const path = require('path')
const { pageModel } = require('../config')

const pathMap: any = {
  '-t': {
    outPath: '/Users/qudian/app-wx-laifenqi_toB/src/pack1/pages', // '/Users/qudian/Documents/project/store-base/src/pages',
    componentPath: '@components',
    resolveComponentPath: '/Users/qudian/app-wx-laifenqi_toB/src/components'// '/Users/qudian/Documents/project/store-base/src/component'
  }
}

const {
  componentPath = './src/component',
  resolveComponentPath = path.resolve('./src/component'),
  outPath = path.resolve('./dist')
} = pathMap[pageModel] || {}

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