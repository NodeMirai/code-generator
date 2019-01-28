import React, { Component } from 'react';
import './style.scss';
import tab from './src/component';

class Demo extends Component {
  render() {
    const {
      text
    } = this.props;
    return <div className='demo'><tab text={text} />;
        
      </div>;
  }

}

export default Demo;