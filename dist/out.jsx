import React, { Component } from 'react';
import './style.scss';
import Nav from './src/component';
import Tab from './src/component';

class Page extends Component {
  render() {
    const {
      text,
      attr2,
      title,
      attr3,
      attr4
    } = this.props;
    return <div className='demo'><Tab text={text}><$div attr1={'attr1-value'} attr2={attr2}></$div></Tab>, <Nav title={title}><$div attr3={attr3} attr4={attr4}></$div></Nav>;
        
      </div>;
  }

}

export default Page;