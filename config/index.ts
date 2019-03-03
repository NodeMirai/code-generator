import { PageConfig } from '../src/class/config'

// ??? ts中变量复制对象时如何类型推导
const pageModalMap: any = {
  '-r': 'PageRender.jsx',
  '-p': 'page.jsx',
  '-t': 'taropage.jsx'
}

export const pageModel = process.argv[2]

const modal = pageModalMap[pageModel]

/**
 * 层级过多时可读性很差，不建议组件层级过多
 */
const pageConfigList: Array<PageConfig> = [
  {
    modal,
    filename: 'myorder',
    className: 'myorder',
    nativeComponentPath: '@tarojs/components',
    children: [
      {
        name: '$View',
        propList: [
          {
            name: 'className',
            value: 'top-notice',
          }
        ],
        children: [
          {
            name: '$Text',
            content: '包袋预约将根据会员等级依次排队文案未定',
          },
          {
            name: '$Text',
            content: '?',
          }
        ]
      },
      {
        name: 'ImageSwiper',
        propList: [
          'items'
        ]
      },
      {
        name: '$View',
        propList: [
          {
            name: 'className',
            value: 'myorder__header-info',
          }
        ],
        children: [
          {
            name: '$Text',
            propList: [
              {
                name: 'className',
                value: 'myorder__header-info__title',
              }
            ],
            content: '1'
          },
          {
            name: '$Text',
            propList: [
              {
                name: 'className',
                value: 'myorder__header-info__price',
              }
            ],
            content: '1'
          },
          {
            name: '$View',
            propList: [
              {
                name: 'className',
                value: 'myorder__header-info__cost',
              }
            ],
            children: [
              {
                name: '$Text',
                propList: [
                  {
                    name: 'className',
                    value: 'text',
                  }
                ],
                content: '1'
              },
              {
                name: '$Text',
                propList: [
                  {
                    name: 'className',
                    value: 'num',
                  }
                ],
                content: '1'
              },
              {
                name: '$Text',
                propList: [
                  {
                    name: 'className',
                    value: 'text',
                  }
                ],
                content: '1'
              },
              {
                name: '$Text',
                propList: [
                  {
                    name: 'className',
                    value: 'unit',
                  }
                ],
                content: '1'
              },
            ]
          },
          {
            name: '$View',
            propList: [
              {
                name: 'className',
                value: 'myorder__header-info__invite',
              },
              {
                name: 'onClick',
                value: 'this.invite',
              }
            ],
            children: [
              {
                name: '$Text',
                content: '邀请同事，一起免费体验',
              }
            ]
          }
        ]
      }
    ]
  }
]

export default pageConfigList