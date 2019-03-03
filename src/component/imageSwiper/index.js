import Taro, { Component } from '@tarojs/taro'
import { Image, Text, Swiper, SwiperItem, View } from '@tarojs/components'
import PropTypes from 'prop-types'
import './index.scss'

export default class HomeSwiper extends Component {
  static defaultProps = {
    items: [],
  }

  static propTypes = {
    items: PropTypes.array
  }

  constructor () {
    this.state = {
      current: 0
    }
  }

  changeCurrent = ({ detail: { current } }) => this.setState({ current })
  clickIndicatorItem = (current) => this.setState({ current })
  
  render() {
    const { items } = this.props
    const { current } = this.state
    return (
      <View className='home-swiper'>
        <Swiper
          className='home-swiper-main'
          autoplay
          circular
          current={current}
          onChange={this.changeCurrent}
        >
          {
            items.map((item, idx) => {
              const { image } = item
              return (
                <SwiperItem
                  key={idx}
                  className='home-swiper__item'
                >
                  <Image className='item__wrap_image' src={image} />
                  {/* <View className='home-swiper__item__wrap'>
                  </View> */}
                </SwiperItem>
              )
            })
          }
        </Swiper>
        {/* 指示器 */}
        <View className='home-swiper__indicator'>
          {
            items.map((item, index) => (
              <View
                key={index}
                className={[
                  'indicator_item',
                  current === index && 'indicator_item--active',
                ]}
                onClick={this.clickIndicatorItem.bind(this, index)}
              />
            ))
          }
        </View>
      </View>
    )
  }
}
