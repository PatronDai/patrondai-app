import React from "react";
import "./App.css";

import { ethers } from "ethers";
import Torus from "@toruslabs/torus-embed";

import EthereumContext from "./contexts/EthereumContext";
import Header from "./components/organisms/Header";
import HeaderMode from "./contexts/headerMode";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      addresses: [],
      initialized: false,
      loginInProgress: false,
      provider: null
    };
  }
  async componentDidMount() {
    this.torus = new Torus();
    await this.torus.init({
      showTorusButton: false,
      enableLogging: true,
      network: { host: "rinkeby" }
    });
    this.setState({ initialized: true });
  }
  render() {
    const { addresses, initialized, loginInProgress } = this.state;
    return (
      <div className="App">
        <HeaderMode.Provider>
        <EthereumContext.Provider value={this.state}>
          <Header login={async () => {
            try {
              this.setState({ loginInProgress: true });
              this.setState({
                addresses: await this.torus.login()
              });
              this.setState({
                provider: new ethers.providers.Provider(
                    this.torus.provider
                )
              });
              this.setState({ loginInProgress: false });
            } catch (error) {
              console.error(error);
            }
          }}/>
        </EthereumContext.Provider>
        </HeaderMode.Provider>
      </div>
    );
  }
}

export default App;
