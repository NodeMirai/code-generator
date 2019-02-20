const pageModalMap = {
  pageRender: 'PageRender',
  page: 'page'
}
const pageModal = pageModalMap['pageRender']

/**
 * $开头表示原生标签
 */
const pageConfigList: Array<any> = [
  {
    type: 'page',
    name: pageModal,
    filename: 'test1.jsx',
    opt: {},
    /**
     * 组件分三类
     * 1. 原生组件
     * 2. 内部组件
     * 3. 第三方组件库
     */
    children: [
      {
        name: '$div',
        opt: {},
        content: '测试一下content'
      },
    ],
  },
  {
    type: 'page',
    name: pageModal,
    filename: 'test2.jsx',
    opt: {},
    /**
     * 组件分三类
     * 1. 原生组件
     * 2. 内部组件
     * 3. 第三方组件库
     */
    children: [
      {
        name: '$div',
        opt: {},
        content: '测试一下content'
      },
    ],
  },
]

export default pageConfigList