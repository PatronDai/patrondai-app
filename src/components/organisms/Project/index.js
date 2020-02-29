import React, { useEffect } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardFooter, CardImg, CardTitle } from "shards-react";
import { Add, Check } from "@material-ui/icons";
import { TextField } from "@material-ui/core";

export function Create() {
  var form = {
    url: "",
    title: "",
    description: ""
  };
  let handleChange = e => {
    form[e.target.id] = e.target.value;
    console.log(form);
  };
  let handleSubmit = () => {
    console.log("Submit", form);
    form = {
      url: "",
      title: "",
      description: ""
    };
  };
  return (
    <div
      style={{
        display: "flex",
        marginTop: "10vh",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <Card>
        <form noValidate autoComplete="off" onChange={handleChange}>
          <CardImg src="https://place-hold.it/600x200" />
          <CardBody>
            <TextField id="url" label="Image url" />
            <CardTitle>
              <TextField id="title" label="Title" />
            </CardTitle>
            <TextField
              id="description"
              label="Description"
              placeholder="Write an interesting description"
              multiline
            />
          </CardBody>
          <CardFooter>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Funded</div>
              <div>Patrons</div>
            </div>
          </CardFooter>
        </form>
      </Card>
      <div className="back" onClick={handleSubmit}>
        <Check style={{ height: "5vh", marginLeft: "1vh" }} />
        <span
          style={{ lineHeight: "5vh", marginRight: "7.5vh", fontWeight: 600 }}
        >
          {" "}
          Create
        </span>
      </div>
    </div>
  );
}

export function Project() {
  let { projectID } = useParams();
  return (
    <div
      style={{
        display: "flex",
        marginTop: "10vh",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <Card>
        <CardImg src="https://place-hold.it/600x200" />
        <CardBody>
          <CardTitle>AAAAa</CardTitle>
          <p>Lorem ipsum dolor sit amet.</p>
        </CardBody>
        <CardFooter>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Funded</div>
            <div>Patrons</div>
          </div>
        </CardFooter>
      </Card>
      <div className="back">
        <Add style={{ height: "5vh", marginLeft: "1vh" }} />
        <span
          style={{ lineHeight: "5vh", marginRight: "7.5vh", fontWeight: 600 }}
        >
          {" "}
          Back
        </span>
      </div>
    </div>
  );
}
