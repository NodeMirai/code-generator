import React, { Component } from 'react';
import './style.scss';
import { View } from 'react';
import tab from './src/component';

class page extends Component {
  render() {
    const {
      text
    } = this.props;
    return <div className='demo'><tab text={text} />, <View />;
        
      </div>;
  }

}

export default page;