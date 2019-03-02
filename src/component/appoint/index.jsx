import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

class Appoint extends Component {
  static defaultProps = {
    hehe: 1
  };

  render() {
    return <div className="appoint"><div className='top-notice'><span>包袋预约将根据会员等级依次排队文案未定</span>,<span>?</span></div>;
        
      </div>;
  }

}

const container = document.createElement('div');
const body = document.getElementsByTagName('body')[0];
body.appendChild(container);
ReactDOM.render(<Appoint />, container);