import { ComponentConfig } from '../../src/class/config'

/**
 * 地址列表项结构
 */
const csList: Array<ComponentConfig> = [
  {
    name: '$View',
    className: 'address-select-item',
    children: [
      {
        name: '$View',
        className: 'address-select-item',
        children: [
          {
            name: '$Image',
            className: 'icon-select',
            propList: [
              {
                name: 'src',
                value: 'http://img002.qufenqi.com/products/67/58/6758ab862d8f96a148df4194c55535ae.png',
              },
              {
                name: 'mode',
                value: 'widthFix',
              },
            ]
          },
          {
            name: '$View',
            className: 'address-select-item__content',
            children: [
              {
                name: '$View',
                className: 'address-select-item__content__user-info',
                children: [
                  {
                    name: '$Text',
                    className: 'user-name',
                  },
                  {
                    name: '$Text',
                    className: 'user-phone',
                  },
                ]
              },
              {
                name: '$View',
                className: 'address-select-item__content__address',
                content: '北京市'
              },
            ]
          },
        ]
      }
    ]
  }
] 

export default csList