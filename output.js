import React, { Component } from 'react'
import './style.scss'
import { tab as hehe } from "Hahaha"

class Demo extends Component {
  render() {
    const {
      text
    } = this.props
    return <div className='demo'><tab text={text} />
        
      </div>
  }

}

export default Demo