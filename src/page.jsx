import React, { Component } from 'react'
import './style.scss'

//import

class Demo extends Component {
  
  render() {
    const { hehe } = this.props
    
    return (
      <div className='demo'>
        {this.props.content}
      </div>
    )
  }
}

export default Demo