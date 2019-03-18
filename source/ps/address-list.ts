import { PageConfig } from '../../src/class/config'
import AddressItem from '../cs/addressItem'

const pageConfig: PageConfig = {
  modal: 'taropage.jsx',
  filename: 'address-select',
  className:'address-select',
  nativeComponentPath: '@tarojs/components',
  children: [
    {
      name: '$View',
      propList: [
        {
          name: 'className',
          value: 'top-fix flex-center'
        }
      ],
      children: [
        {
          name: '$Image',
          propList: [
            {
              name: 'className',
              value: 'icon-add',
            },
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