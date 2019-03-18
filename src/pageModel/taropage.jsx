import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux"
//import
import action from '@utils/action'
import './style.scss'

// 声明saga中model名称
const model = 'confirmOrder'
@connect((state) => state[model])
class Demo extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(action(`${model}/getInitData`))
  }

  render() {
    
    return (
      <View className='demo'>
        
      </View>
    )
  }
}

export default Demo