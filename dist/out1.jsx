import React, { Component } from 'react';
import './style.scss';
import { Text, Video } from 'react';
import tab from './src/component';

class Demo extends Component {
  render() {
    const {} = this.props;
    return <div className='demo'><tab />, <Text />, <Video />;
        
      </div>;
  }

}

export default Demo;