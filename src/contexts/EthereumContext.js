import React from "react";

export default React.createContext({
  provider: null,
  addresses: [],
  loginInProgress: false,
  initialized: false
});
