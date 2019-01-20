import React, { Component } from 'react'
import './style.scss'

//import

class Demo extends Component {

  render() {
    return (
      <div className='demo'>
        {this.props.content}
      </div>
    )
  }
}

export default Demo