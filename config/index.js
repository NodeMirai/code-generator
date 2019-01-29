/**
 * $开头表示原生标签
 */
const pageConfigList = [
  {
    type: 'page',
    name: 'Page',
    filename: 'out.jsx',
    opt: {},
    /**
     * 组件分三类
     * 1. 原生组件
     * 2. 内部组件
     * 3. 第三方组件库
     */
    children: [
      {
          name: 'Tab',
          opt: {},
          children: []
      },
      {
          name: '$View',
          opt: {},
          children: []
      },
    ],
  },
  {
    type: 'page',
    name: 'Page',
    filename: 'out1.jsx',
    opt: {},
    /**
     * 组件分三类
     * 1. 原生组件
     * 2. 内部组件
     * 3. 第三方组件库
     */
    children: [
      {
          name: 'Tab',
          opt: {},
          children: []
      },
      {
          name: '$Text',
          opt: {},
          children: []
      },
      {
        name: '$Video',
        opt: {},
        children: []
    },
    ],
  },
]

module.exports = pageConfigList