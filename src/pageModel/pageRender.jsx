import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style.scss'

//import

class Demo extends Component {
  
  static defaultProps = {
    hehe: 1
  }

  render() {
    
    return (
      <div className='demo'>
        
      </div>
    )
  }
}

const container = document.createElement('div')
const body = document.getElementsByTagName('body')[0]
body.appendChild(container)
ReactDOM.render(<Demo />, container)