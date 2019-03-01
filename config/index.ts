import { PageConfig } from '../src/class/config'

const pageModalMap = {
  pageRender: 'PageRender.jsx',
  page: 'page.jsx'
}
const modal = pageModalMap['pageRender']

/**
 * 层级过多时可读性很差，不建议组件层级过多
 */
const pageConfigList: Array<PageConfig> = [
  {
    type: 'page',
    modal,
    filename: 'twoModal',
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
  },
]

export default pageConfigList