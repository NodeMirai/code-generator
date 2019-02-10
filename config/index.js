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
        children: [
          {
            name: 'Sub',
            props: [{
              name: 'attr1',
              value: 'test'
            }, 'attr2'],
            children: []
          }
        ]
      },
      {
        name: 'Nav',
        opt: {},
        children: [
          {
            name: 'Item',
            props: ['attr3', 'attr4'],
            children: []
          }
        ]
      },
    ],
  },
]

module.exports = pageConfigList