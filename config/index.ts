/**
 * $开头表示原生标签
 */
const pageConfigList: Array<any> = [
  {
    type: 'page',
    name: 'Page',
    filename: 'register.jsx',
    opt: {},
    /**
     * 组件分三类
     * 1. 原生组件
     * 2. 内部组件
     * 3. 第三方组件库
     */
    children: [
      {
        name: '$View',
        opt: {},
        children: []
      },
      {
        name: '$Input',
        opt: {},
      },
      {
        name: '$Input',
        opt: {},
      },
      {
        name: '$Button',
        opt: {},
      },
    ],
  },
]

export default pageConfigList