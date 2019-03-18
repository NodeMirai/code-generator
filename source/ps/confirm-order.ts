import { PageConfig } from '../../src/class/config'

/**
 * 确认订单页结构
 * 顶部地址选择 + 商品信息 + 金额信息 + 总金额 + 底部按钮
 */
const pageConfig: PageConfig = {
  modal: 'taropage.jsx',
  filename: 'confirm-order',
  className:'conform-order',
  nativeComponentPath: '@tarojs/components',
  children: [
    {
      name: 'order-address'
    },
    {
      name: 'goods-info'
    },
    {
      name: 'mylist',
      useDefaultProp: false,
    },
    {
      name: '$View',
      className: 'comfirm-order__ft bottom-fix',
      children: [
        {
          name: 'input-item',
          useDefaultProp: false,
        }
      ]
    }
  ]
}

export default pageConfig