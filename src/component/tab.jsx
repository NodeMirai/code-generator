import React, { Component } from 'react'
import './style.scss'

class Tab extends Component {

  render() {
    return (
      <div className='Tab'>
        {this.props.content}
      </div>
    )
  }
}

// 定义属性接口
Tab.defaultProps = {
  text: 'tab text'
}

export default Tab