const pageModalMap = {
  pageRender: 'PageRender.jsx',
  page: 'page.jsx'
}
const modal = pageModalMap['pageRender']

interface pageConfig {
  type?: string
  modal?: string
  name: string
  opt?: object
  propList: Array<any>|string
  children?: Array<pageConfig>
}


/**
 * $开头表示原生标签
 */
const pageConfigList: Array<pageConfig> = [
  {
    type: 'page',
    modal,
    name: 'ImgText',
    opt: {},
    children: [
      {
        name: '$image',
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