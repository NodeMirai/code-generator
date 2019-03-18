import { PageConfig } from '../../src/class/config'

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
      name: 'mylist'
    },
    {
      name: '$View',
      className: 'comfirm-order__ft bottom-fix',
      children: [
        {
          name: 'input-item'
        }
      ]
    }
  ]
}

export default pageConfig