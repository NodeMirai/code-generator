import React, { Component } from "react";
import "./style.scss";
import Nav from "./src/component";
import Tab from "./src/component";

class Page extends Component {
  render() {
    const { text, attr1, attr2, title, attr3, attr4 } = this.props;
    return (
      <div className="demo">
        <Tab text={text}>
          <Sub attr1={attr1} attr2={attr2} />
        </Tab>
        ,{" "}
        <Nav title={title}>
          <Item attr3={attr3} attr4={attr4} />
        </Nav>
        ;
      </div>
    );
  }
}

export default Page;
