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
          <Header
            login={async () => {
              try {
                this.setState({ loginInProgress: true });
                this.setState({
                  addresses: await this.torus.login()
                });
                const provider = new ethers.providers.Web3Provider(
                  this.torus.provider
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
          {this.props.children}
        </EthereumContext.Provider>
      </div>
    );
  }
}

export default Layout;
