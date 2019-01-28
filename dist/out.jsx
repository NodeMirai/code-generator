import React, { Component } from "react";
import "./style.scss";
import { View } from "react";
import tab from "./src/component";

class Demo extends Component {
  render() {
    const {} = this.props;
    return (
      <div className="demo">
        <tab />, <View />;
      </div>
    );
  }
}

export default Demo;
