import React from "react";
import "./index.css";
import HeaderMode from "../../../contexts/headerMode";
import logo from "../../../resources/logo.png";
import EthereumContext from "../../../contexts/EthereumContext";

export default function Header({ money, login }) {
  let header = HeaderMode.useContainer();
  let changeMode = e => {
    header.changeMode(e.target.id);
  };
  let add = e => {
    console.log("add");
  };
  let home = e => {
    console.log("home");
  };
  let topup = e => {
    console.log("topup");
  };
  let withdraw = e => {
    console.log("withdraw");
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
            value.provider ? (
              <div className="flex-row">
                <div id="deposit">Deposit</div>
                <img
                  src="https://dynamic-assets.coinbase.com/90184cca292578d533bb00d9ee98529b889c15126bb120582309286b9129df9886781b30c85c21ee9cae9f2db6dc11e88633c7361fdd1ba5046ea444e101ae15/asset_icons/ebc24b163bf1f58a9732a9a1d2faa5b2141b041d754ddc2260c5e76edfed261e.png"
                  alt="DAI"
                />
                <div>{money}</div>
                <div>Logout</div>
              </div>
            ) : (
              <div id="login" onClick={login}>
                Login
              </div>
            )
          }
        </EthereumContext.Consumer>
      </div>
    </div>
  );
}
