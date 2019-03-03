import { PageConfig } from '../src/class/config'

// ??? ts中变量复制对象时如何类型推导
const pageModalMap: any = {
  '-r': 'PageRender.jsx',
  '-p': 'page.jsx',
  '-t': 'taropage.jsx'
}

export const pageModal = process.argv[2]

const modal = pageModalMap[pageModal]

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
        name: '$View',
        propList: [
          {
            name: 'className',
            value: 'top-notice',
          }
        ],
        children: [
          {
            name: '$Text',
            content: '包袋预约将根据会员等级依次排队文案未定',
          },
          {
            name: '$Text',
            content: '?',
          }
        ]
      },
      {
        name: 'ImageSwiper'
      }
    ]
  }
]

export default pageConfigList