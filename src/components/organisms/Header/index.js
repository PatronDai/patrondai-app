import React, { useEffect, useState } from "react";
import "./index.css";
import HeaderMode from "../../../contexts/headerMode";
import logo from "../../../resources/logo.png";
import EthereumContext from "../../../contexts/EthereumContext";
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";

export default function Header({ login }) {
  let header = HeaderMode.useContainer();
  let history = useHistory();
  let changeMode = e => {
    header.changeMode(e.target.id);
    history.push("/");
  };
  let ethereum = React.useContext(EthereumContext);

  let [balance, setBalance] = useState([]);

  useEffect(() => {
    async function getDaiBalance() {
      if (!ethereum.daiContract) {
        return;
      }
      const balance = await ethereum.daiContract.balanceOf(
        ethereum.addresses[0]
      );
      setBalance(Math.floor(balance / 10 ** 16) / 100);
    }
    getDaiBalance();
  }, [ethereum]);

  let deposit = async () => {
    new RampInstantSDK({
      hostAppName: "Patron DAI",
      hostLogoUrl:
        "https://github.com/PatronDai/patrondai-app/blob/master/src/resources/logo.png?raw=true",
      swapAmount: "10000000000000000",
      swapAsset: "DAI",
      userAddress: ethereum.addresses[0],
      variant: "auto"
    })
      .on("*")
      .show();
  };

  return (
    <div className="wrapper">
      <div
        className="patron"
        id="patron"
        onClick={changeMode}
        style={
          header.mode !== "patron"
            ? { backgroundColor: "#fefeff", color: "#a3a3a3" }
            : { backgroundColor: "#eaebeb", color: "black" }
        }
      >
        <img id="logo" src={logo} alt="logo" />
        <span id="patron" onClick={changeMode}>
          Patron{" "}
        </span>
      </div>
      <div
        id="creator"
        className="creator"
        onClick={changeMode}
        style={
          header.mode === "patron"
            ? { backgroundColor: "#fefeff", color: "#a3a3a3" }
            : { backgroundColor: "#eaebeb", color: "black" }
        }
      >
        <span id="creator" onClick={changeMode}>
          {" "}
          Creator
        </span>
        <EthereumContext.Consumer>
          {value =>
            value.initialized &&
            (value.loginInProgress ? (
              <div id="logout" style={{ marginRight: "1vw" }}>
                Logging in...
              </div>
            ) : value.provider ? (
              <div className="flex-row">
                <div id="deposit" onClick={deposit}>
                  Deposit
                </div>
                <img
                  src="https://dynamic-assets.coinbase.com/90184cca292578d533bb00d9ee98529b889c15126bb120582309286b9129df9886781b30c85c21ee9cae9f2db6dc11e88633c7361fdd1ba5046ea444e101ae15/asset_icons/ebc24b163bf1f58a9732a9a1d2faa5b2141b041d754ddc2260c5e76edfed261e.png"
                  alt="DAI"
                />
                <div id="deposit">{balance}</div>
                <div id="logout">Logout</div>
              </div>
            ) : (
              <div id="login" onClick={login}>
                Login
              </div>
            ))
          }
        </EthereumContext.Consumer>
      </div>
    </div>
  );
}
