import { PageConfig } from '../src/class/config'

// ??? ts中变量复制对象时如何类型推导
const pageModalMap: any = {
  '-r': 'PageRender.jsx',
  '-p': 'page.jsx',
  '-t': 'taropage.jsx'
}

export const pageModel = process.argv[2]

const modal = pageModalMap[pageModel]

/**
 * 层级过多时可读性很差，不建议组件层级过多
 */
const pageConfigList: Array<PageConfig> = [
  {
    modal,
    filename: 'myorder',
    className: 'myorder',
    nativeComponentPath: '@tarojs/components',
    children: [
      {
        name: 'address'
      },
      {
        name: 'bag-info'
      }
    ]
  }
]

export default pageConfigList