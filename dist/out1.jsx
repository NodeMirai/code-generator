import React, { Component } from 'react';
import './style.scss';
import Tab from './src/component';

class Page extends Component {
  render() {
    const {
      text
    } = this.props;
    return <div className='demo'><Tab text={text} />, <Text />, <Video />;
        
      </div>;
  }

}

export default Page;