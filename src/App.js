import React from "react";
import logo from "./logo.svg";
import "./App.css";

import ethers from "ethers";
import Torus from "@toruslabs/torus-embed";
import NavBar from "./components/organisms/NavBar";

import EthereumContext from "./contexts/EthereumContext";

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
        <EthereumContext.Provider value={this.state}>
          <NavBar />
          {initialized ? (
            <div>
              {loginInProgress ? (
                <div>Logging in...</div>
              ) : (
                <div>
                  {!addresses.length ? (
                    <button
                      onClick={async () => {
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
                      }}
                    >
                      Login
                    </button>
                  ) : (
                    addresses
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>Wait for it...</div>
          )}
        </EthereumContext.Provider>
      </div>
    );
  }
}

export default App;
