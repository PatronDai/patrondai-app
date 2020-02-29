import React from "react";
import "./index.css";
import { Add, ChevronRight } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button
} from "shards-react";

const list = [
  { title: "AAAcd sdccds", id: 999 },
  { title: "dhibcibhsd chsdjhsbd", id: 38388 },
  { title: "KCNMsjdkcdnns sj sn", id: 4244 },
  { title: "cjndjkb asbjkb", id: 262666 }
];

const my = [{ title: "AAAcd sdccds", id: 999 }];

export function Grid() {
  return (
    <div className="grid-wrapper">
      <h1>Projects</h1>
      <div className="grid">
        {list.map((val, idx) => (
          <Card style={{ maxWidth: "400px" }} key={idx}>
            <CardImg src="https://place-hold.it/300x200" />
            <CardBody>
              <CardTitle>{val.title}</CardTitle>
              <p>Lorem ipsum dolor sit amet.</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Back</div>
                <Link to={"/project/" + val.id}>More</Link>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Add />
                <Link to={"/project/" + val.id}>
                  <ChevronRight />
                </Link>
              </div>
            </CardBody>
            <CardFooter>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Funded</div>
                <div>Patrons</div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function CreatorGrid() {
  let history = useHistory();
  let create = () => {
    history.push("/create");
  };
  return (
    <div className="grid-wrapper">
      <h1>Projects</h1>
      <div className="grid">
        {my.map((val, idx) => (
          <Card style={{ maxWidth: "400px" }} key={idx}>
            <CardImg src="https://place-hold.it/300x200" />
            <CardBody>
              <CardTitle>{val.title}</CardTitle>
              <p>Lorem ipsum dolor sit amet.</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Back</div>
                <Link to={"/project/" + val.id}>More</Link>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Add />
                <Link to={"/project/" + val.id}>
                  <ChevronRight />
                </Link>
              </div>
            </CardBody>
            <CardFooter>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Funded</div>
                <div>Patrons</div>
              </div>
            </CardFooter>
          </Card>
        ))}
        <Card onClick={create} style={{ maxWidth: "400px" }}>
          <CardBody>
            <CardTitle>Create a project</CardTitle>
            <Add style={{ marginTop: "50%" }} fontSize={"large"} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
