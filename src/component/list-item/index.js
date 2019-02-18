import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

export default class extends Component {

  static defaultProps = {
    leftText: '',
    rightText: '',
    rightNotice: false,
    del: false,
    line: true,
    cla: false,
    type: 'n',
    onClick: () => {}
  }

  render () {
    const { leftText, rightText, rightNotice, del, line, onClick, type } = this.props
    return (
      <View className={classNames('list-item', { 'bottom-1px': line, [type]: type })} onClick={onClick}>
        <Text className='left'>{leftText}</Text>
        <View className='right'>
          { rightNotice && <Text className='right-notice'>{rightNotice}</Text> }
          <Text className={classNames('right-text', { 'del': del })}>{rightText}</Text>
        </View>
      </View>
    )
  }
}

