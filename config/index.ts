const pageModalMap = {
  pageRender: 'PageRender.jsx',
  page: 'page.jsx'
}
const modal = pageModalMap['pageRender']

interface PageConfig {
  type?: string
  modal: string
  filename: string
  opt?: object
  propList?: Array<any>|string
  children?: Array<ComponentConfig>
}

interface ComponentConfig {
  name: string
  propList?: Array<object>
  content?: string
  children?: Array<ComponentConfig>
}

/**
 * 层级过多时可读性很差，不建议组件层级过多
 */
const pageConfigList: Array<PageConfig> = [
  {
    type: 'page',
    modal,
    filename: 'imgText',
    opt: {},
    children: [
      {
        name: '$img',
        propList: [
          {
            name: 'className',
            value: 'img',
          }
        ]
      },
      {
        name: '$div',
        propList: [
          {
            name: 'className',
            value: 'text',
          }
        ],
        children: [
          {
            name: '$div',
            propList: [
              {
                name: 'className',
                value: 'title',
              }
            ],
            content: '主title'
          },
          {
            name: '$div',
            propList: [
              {
                name: 'className',
                value: 'sub-title',
              }
            ],
            content: '子title'
          },
        ]
      },
    ],
  },
]

export default pageConfigList