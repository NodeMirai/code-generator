import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import selectedIcon from '@assets/selected.png'
import './index.scss'

export default class RadioList extends Component {
  
  render () {
    const { onSelect, radioList, groupName, selectItem } = this.props
    return (
      <View className='radio-list'>
        {
          radioList.map((item, index) => {
            return (
              <View
                className='radio'
                onClick={onSelect.bind(this, item, groupName)}
                key={index}
              >
                {
                  selectItem.id === item.id
                  ?
                  <Image className='radio--selected' src={selectedIcon} mode='widthFix' />
                  :
                  <View className='radio--unselect' />
                }
                <Text className='radio__text'>{item.title}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}
