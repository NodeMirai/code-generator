import { PageConfig } from '../src/class/config'
import confirmOrder from '../source/ps/confirm-order'
import selectAddressList from '../source/ps/address-list'
// ??? ts中变量复制对象时如何类型推导
/* const pageModalMap: any = {
  '-r': 'PageRender.jsx',
  '-p': 'page.jsx',
  '-t': 'taropage.jsx'
} */

export const pageModel = process.argv[2]

/**
 * $: 原生组件      nativeComponentPath
 * &: 第三方组件    thirdComponentPath
 * 层级过多时可读性很差，不建议组件层级过多
 */
const pageConfigList: Array<PageConfig> = [
  /* confirmOrder,
  selectAddressList, */
  {
    modal: 'pageRender.jsx',
    filename: 'address-select',
    children: [
      {
        name: '$div',
        propList: [
          {
            name: 'style',
            value: 'background: red;'
          }
        ]
      }
    ]
  }
]

export default pageConfigList