import { ComponentConfig } from '../../src/class/config'

const csList: Array<ComponentConfig> = [
  {
    name: '$View',
    propList: [
      {
        name: 'className',
        value: 'address-select-item',
      },
    ],
    children: [
      {
        name: '$View',
        propList: [
          {
            name: 'className',
            value: 'address-select-item',
          },
        ],
        children: [
          {
            name: '$View',
          },
          {
            name: '$View',
          },
        ]
      }
    ]
  }
] 

export default csList