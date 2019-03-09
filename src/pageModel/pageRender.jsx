import React, { Component } from 'react'
import ReactDOM from 'react-dom'
//import
import './style.scss'


class Demo extends Component {

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
ReactDOM.render(<Demo /> , container)