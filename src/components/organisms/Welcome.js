import React from "react";
import { ChevronRight, ChevronLeft } from "@material-ui/icons";
import HeaderMode from "../../contexts/headerMode";

export default function Welcome() {
  let header = HeaderMode.useContainer();
  return (
    <div
      id="welcome"
      style={{
        width: "100%",
        height: "100%",
        textAlign: "center",
        marginTop: "15vh"
      }}
    >
      <h1 style={{ marginBottom: "15vh" }}>
        Welcome to <span style={{ fontWeight: 600 }}>PatronDAI</span>!
      </h1>
      <h2
        style={{
          marginLeft: "40%",
          width: "20%",
          borderBottom: "1px solid #fabd3b"
        }}
      />
      <h3>To start using the app, just log in!</h3>
      <div style={{ marginTop: "10vh" }}>
        <ChevronLeft
          fontSize={"large"}
          style={
            header.mode !== "patron" ? { color: "#a3a3a3" } : { color: "black" }
          }
        />
        <ChevronRight
          fontSize={"large"}
          style={
            header.mode === "patron" ? { color: "#a3a3a3" } : { color: "black" }
          }
        />
      </div>
      <style>
        {header.mode !== "patron"
          ? `
        body {
          background: linear-gradient(90deg, #fefeff 50%, #eaebeb 50%);
        }
        #welcome {
          background: linear-gradient(90deg, #fefeff 50%, #eaebeb 50%);
        }
      `
          : `
        body {
          background: linear-gradient(90deg, #eaebeb 50%, #fefeff 50%);
        }
        #welcome {
          background: linear-gradient(90deg, #eaebeb 50%, #fefeff 50%);
        }
      `}
      </style>
    </div>
  );
}
