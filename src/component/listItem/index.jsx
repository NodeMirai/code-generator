import React, { Component } from "react";
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
      <div className={classNames('list-item', { 'bottom-1px': line, [type]: type })} onClick={onClick}>
        <span className='left'>{leftText}</span>
        <div className='right'>
          { rightNotice && <span className='right-notice'>{rightNotice}</span> }
          <span className={classNames('right-text', { 'del': del })}>{rightText}</span>
        </div>
      </div>
    )
  }
}

