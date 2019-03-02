import { PageConfig } from '../src/class/config'

const pageModalMap = {
  pageRender: 'PageRender.jsx',
  page: 'page.jsx',
  taro: 'taropage.jsx'
}

/**
 * 层级过多时可读性很差，不建议组件层级过多
 */
const pageConfigList: Array<PageConfig> = [
  /* {
    modal: pageModalMap.pageRender,
    filename: 'twoModal',
    nativeComponentPath: '@tarojs/taro',
    className: 'two-modal',
    opt: {},
    children: [
      {
        name: 'Modal',
        propList: [
          'visible',
          'showCancel',
          'showOk',
          {
            name: 'cancelText',
            value: '取消'
          },
          {
            name: 'okText',
            value: '确定'
          },
        ]
      },
      {
        name: 'Modal',
      },
    ],
  }, */
  {
    modal: pageModalMap.pageRender,
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
        ]
      }
    ]
  }
]

export default pageConfigList