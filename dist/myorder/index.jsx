import React, { Component } from "react";
import BagInfo from "./src/component/bag-info";
import Address from "./src/component/address";
import "./style.scss";

class Myorder extends Component {
  render() {
    return (
      <div className="myorder">
        <Address />
        <BagInfo />
      </div>
    );
  }
}

export default Myorder;
