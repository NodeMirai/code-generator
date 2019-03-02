import { PageConfig } from '../src/class/config'

// ??? ts中变量复制对象时如何类型推导
const pageModalMap: any = {
  '-r': 'PageRender.jsx',
  '-p': 'page.jsx',
  '-t': 'taropage.jsx'
}

const modal = pageModalMap[process.argv[2]]

/**
 * 层级过多时可读性很差，不建议组件层级过多
 */
const pageConfigList: Array<PageConfig> = [
  {
    modal,
    filename: 'appoint',
    className: 'appoint',
    children: [
      {
        name: '$div',
        propList: [
          {
            name: 'className',
            value: 'top-notice',
          }
        ],
        children: [
          {
            name: '$span',
            content: '包袋预约将根据会员等级依次排队文案未定',
          },
          {
            name: '$span',
            content: '?',
          }
        ]
      }
    ]
  }
]

export default pageConfigList