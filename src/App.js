import React from "react";
import "./App.css";
import { Grid, CreatorGrid } from "./components/organisms/Grid";
import Layout from "./components/organisms/Layout";
import { Switch, Route } from "react-router-dom";
import { Project, Create } from "./components/organisms/Project";
import HeaderMode from "./contexts/headerMode";
import EthereumContext from "./contexts/EthereumContext";

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
                  : () => (
                      <div
                        style={{
                          width: "100%",
                          textAlign: "center",
                          marginTop: "15vh"
                        }}
                      >
                        Log in first!
                      </div>
                    )
              }
            />
            <Route
              path="/project/:address"
              component={
                value.provider
                  ? Project
                  : () => (
                      <div
                        style={{
                          width: "100%",
                          textAlign: "center",
                          marginTop: "15vh"
                        }}
                      >
                        Log in first!
                      </div>
                    )
              }
            />
            <Route
              path="/create"
              component={
                value.provider
                  ? Create
                  : () => (
                      <div
                        style={{
                          width: "100%",
                          textAlign: "center",
                          marginTop: "15vh"
                        }}
                      >
                        Log in first!
                      </div>
                    )
              }
            />
          </Switch>
        )}
      </EthereumContext.Consumer>
    </Layout>
  );
}
