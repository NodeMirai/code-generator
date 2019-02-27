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
    filename: 'imgText',
    className: 'demo p40',
    opt: {},
    children: [
      {
        name: '$img',
        propList: [
          {
            name: 'className',
            value: 'img',
          },
          {
            name: 'src',
            value: 'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg'
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