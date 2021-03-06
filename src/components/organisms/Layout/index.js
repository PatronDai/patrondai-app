import React from "react";
import patronDaiCampaignsRegistry from "patrondai-contracts/build/contracts/PatronDaiCampaignsRegistry";
import rinkebyBuild from "patrondai-contracts/.openzeppelin/rinkeby";

import IERC20 from "patrondai-contracts/build/contracts/IERC20";

import { ethers } from "ethers";
import Torus from "@toruslabs/torus-embed";

import EthereumContext from "../../../contexts/EthereumContext";
import Header from "../../organisms/Header";

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      addresses: [],
      initialized: false,
      loginInProgress: false,
      provider: null,
      torus: null
    };
  }
  async componentDidMount() {
    this.state.torus = new Torus();
    await this.state.torus.init({
      showTorusButton: false,
      enableLogging: true,
      network: { host: "rinkeby" }
    });
    this.setState({ initialized: true });
  }
  render() {
    const { addresses, initialized, loginInProgress, torus } = this.state;
    return (
      <div className="App">
        <EthereumContext.Provider value={this.state}>
          <EthereumContext.Consumer>
            {value => (
              <Header
                money={9999}
                logout={async () => {
                  await value.torus.logout();
                  await value.torus.cleanUp();
                  value.provider = null;
                  value.torus = null;
                  this.setState({ provider: null, torus: null });
                }}
                login={async () => {
                  try {
                    if (!value.torus) {
                      this.setState({ initialized: false });
                      value.torus = new Torus();
                      await value.torus.init({
                        showTorusButton: false,
                        enableLogging: true,
                        network: { host: "rinkeby" }
                      });
                      this.setState({ initialized: true });
                    }
                    this.setState({ loginInProgress: true });
                    this.setState({
                      addresses: await value.torus.login()
                    });
                    const provider = new ethers.providers.Web3Provider(
                      value.torus.provider
                    ).getSigner(0);
                    const contract = new ethers.Contract(
                      rinkebyBuild.proxies[
                        "squirvels-contracts/PatronDaiCampaignsRegistry"
                      ][0].address,
                      patronDaiCampaignsRegistry.abi,
                      provider
                    );
                    const daiContract = new ethers.Contract(
                      "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
                      IERC20.abi,
                      provider
                    );
                    this.setState({
                      provider,
                      contract,
                      daiContract
                    });
                    this.setState({ loginInProgress: false });
                  } catch (error) {
                    console.error(error);
                  }
                }}
              />
            )}
          </EthereumContext.Consumer>

          {this.props.children}
        </EthereumContext.Provider>
      </div>
    );
  }
}

export default Layout;
