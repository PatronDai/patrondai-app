import React, { Component } from "react";

import LogoImg from "../../resources/logo.png";

import "./Logo.css";

export default class Logo extends Component {
  render() {
    return (
      <div className="Logo">
        <img src={LogoImg} alt="PatronDai" />
      </div>
    );
  }
}
