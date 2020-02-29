import React from "react";

// import EthereumContext from "./contexts/EthereumContext";
// const ethereum = React.useContext(EthereumContext);

export default React.createContext({
  provider: null,
  addresses: [],
  loginInProgress: false,
  initialized: false
});
