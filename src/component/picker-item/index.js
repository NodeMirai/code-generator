import Taro, { Component } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import './index.scss'

export default class extends Component {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    title: '',
    selected: '',
    myStyle: '',
    onClick: () => {}
  }

  render () {
    const { title, selected, onClick, myStyle } = this.props

    return (
      <View className='picker-item' style={myStyle} onClick={onClick}>
        <Text className='picker-title'>{title}</Text>
        <View className='right'>
          <Text className='selected'>{selected}</Text>
          <Text className='arrow'></Text>
        </View>
      </View>
    )
  }
}

