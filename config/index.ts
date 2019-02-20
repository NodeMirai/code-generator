const pageModalMap = {
  pageRender: 'PageRender.jsx',
  page: 'page.jsx'
}
const modal = pageModalMap['pageRender']

/**
 * $开头表示原生标签
 */
const pageConfigList: Array<any> = [
  {
    type: 'page',
    modal,
    filename: 'test1',
    opt: {},
    children: [
      {
        name: '$div',
        opt: {},
        content: '测试一下content'
      },
    ],
  },
  /* {
    type: 'page',
    name: pageModal,
    filename: 'test2.jsx',
    opt: {},
    children: [
      {
        name: '$div',
        opt: {},
        content: '测试一下content'
      },
    ],
  }, */
]

export default pageConfigList