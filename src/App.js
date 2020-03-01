import React from "react";
import "./App.css";
import { Grid, CreatorGrid } from "./components/organisms/Grid";
import Layout from "./components/organisms/Layout";
import { Switch, Route } from "react-router-dom";
import { Project, Create } from "./components/organisms/Project";
import HeaderMode from "./contexts/headerMode";
import EthereumContext from "./contexts/EthereumContext";
import Welcome from "./components/organisms/Welcome";

export default function App() {
  let ethereum = React.useContext(EthereumContext);
  let header = HeaderMode.useContainer();

  return (
    <Layout>
      <EthereumContext.Consumer>
        {value => (
          <Switch>
            <Route
              exact
              path="/"
              component={
                value.provider
                  ? header.mode === "patron"
                    ? Grid
                    : CreatorGrid
                  : Welcome
              }
            />
            <Route
              path="/project/:address"
              component={value.provider ? Project : Welcome}
            />
            <Route
              path="/create"
              component={value.provider ? Create : Welcome}
            />
          </Switch>
        )}
      </EthereumContext.Consumer>
    </Layout>
  );
}
