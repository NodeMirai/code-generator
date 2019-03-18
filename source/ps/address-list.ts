import { PageConfig } from '../../src/class/config'
import AddressItem from '../cs/addressItem'

/**
 * 地址列表页：顶部添加地址 + 地址分页查询列表
 */
const pageConfig: PageConfig = {
  modal: 'taropage.jsx',
  filename: 'address-select',
  className:'address-select',
  nativeComponentPath: '@tarojs/components',
  children: [
    {
      name: '$View',
      className: 'top-fix flex-center',
      children: [
        {
          name: '$Image',
          className: 'icon-add',
          propList: [
            {
              name: 'src',
              value: 'http://img002.qufenqi.com/products/67/58/6758ab862d8f96a148df4194c55535ae.png',
            },
            {
              name: 'mode',
              value: 'widthFix'
            }
          ]
        },
        {
          name: '$Text',
          content: '添加地址'
        }
      ]
    },
    ...AddressItem
  ]
}

export default pageConfig