import React, { Component } from "react";
import Logo from "../atoms/Logo";

import "./NavBar.css";

export default class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <Logo />
        <div className="NavBar-brand">PatronDai</div>
      </div>
    );
  }
}
