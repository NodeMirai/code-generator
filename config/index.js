module.exports = {
  type: 'page',
  name: 'page',
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
        name: 'tab',
        opt: {},
        children: []
    },
    {
        name: '$View',
        opt: {},
        children: []
    },
  ],
}