import React from "react";
import logo from "./logo.svg";
import "./App.css";

import ethers from "ethers";
import Torus from "@toruslabs/torus-embed";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  async componentDidMount() {
    this.torus = new Torus();
    await this.torus.init();
    await this.torus.login();
    this.ethereum = new ethers.providers.Web3Provider(this.torus.provider);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
