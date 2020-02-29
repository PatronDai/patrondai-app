import React from "react";
import "./App.css";
import { Grid, CreatorGrid } from "./components/organisms/Grid";
import Layout from "./components/organisms/Layout";
import { Switch, Route } from "react-router-dom";
import { Project, Create } from "./components/organisms/Project";
import HeaderMode from "./contexts/headerMode";

export default function App() {
  let header = HeaderMode.useContainer();
  return (
    <Layout>
      <Switch>
        <Route
          exact
          path="/"
          component={header.mode === "patron" ? Grid : CreatorGrid}
        />
        <Route path="/project/:projectID" component={Project} />
        <Route path="/create" component={Create} />
      </Switch>
    </Layout>
  );
}
