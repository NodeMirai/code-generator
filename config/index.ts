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
 * $: 原生组件      nativeComponentPath
 * &: 第三方组件    thirdComponentPath
 * 层级过多时可读性很差，不建议组件层级过多
 */
const pageConfigList: Array<PageConfig> = [
  {
    modal,
    filename: 'listPage',
    className: 'list-page',
    thirdComponentPath: 'antd-mobile',
    children: [
      {
        name: '&List',
        propList: [
          {
            name: 'renderHeader',
            value: 'list title'
          }
        ],
        children: [
          {
            name: '&Item',
            propList: [
              {
                name: 'arrow',
                value: 'horizontal',
              },
              {
                name: 'multipleLine',
                value: 'true'
              }
            ],
            children: [
              {
                name: '&Brief',
                content: '副标题',
              }
            ]
          },
          {
            name: '&Item',
            propList: [
              {
                name: 'arrow',
                value: 'horizontal',
              },
              {
                name: 'thumb',
                value: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
              },
              {
                name: 'multipleLine',
                value: 'true'
              }
            ],
            children: [
              {
                name: '&Brief',
                content: '副标题',
              }
            ]
          }
        ]
      }
    ]
  }
]

export default pageConfigList