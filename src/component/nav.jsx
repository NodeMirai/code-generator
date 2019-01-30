import React, { Component } from 'react'
import './style.scss'

class Nav extends Component {

  render() {
    return (
      <div className='Tab'>
        {this.props.content}
      </div>
    )
  }
}

// 定义属性接口
Nav.defaultProps = {
  title: 'title text'
}

export default Nav