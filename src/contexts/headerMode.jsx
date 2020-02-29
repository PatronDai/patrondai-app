import { useState } from "react";
import { createContainer } from "unstated-next";

function useMode(initialState = "patron") {
  let [mode, setMode] = useState(initialState);

  let changeMode = newMode => {
    if (newMode !== mode) {
      setMode(newMode);
      return newMode;
    }
    return false;
  };

  return { mode, changeMode };
}

let HeaderMode = createContainer(useMode);
export default HeaderMode;
