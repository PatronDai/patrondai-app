import React, { useEffect, useState } from "react";
import "./index.css";
import { Add, ChevronRight } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import EthereumContext from "../../../contexts/EthereumContext";
import patronDaiCampaign from "patrondai-contracts/build/contracts/PatronDaiCampaign";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button
} from "shards-react";
import { ethers } from "ethers";
import { back } from "../../swal";

const list = [
  { title: "AAAcd sdccds", id: 999 },
  { title: "dhibcibhsd chsdjhsbd", id: 38388 },
  { title: "KCNMsjdkcdnns sj sn", id: 4244 },
  { title: "cjndjkb asbjkb", id: 262666 }
];

const my = [
  {
    title: "Puppies need You!",
    url:
      "https://www.hearingdogs.org.uk/globalassets/blog/blog-images/gwens-first-eight-weeks/977x550-hearing-dog-sponsor-puppy-gwen.jpg",
    description: "Show some love to the puppies, you wont spend a penny!",
    id: 999
  }
];

export function Grid() {
  let ethereum = React.useContext(EthereumContext);
  let [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function getCampaigns() {
      let count =
        ethereum.contract && (await ethereum.contract.getCampaignsCount());
      let campaigns2 = campaigns;
      for (let i = count - 1; i >= 0; i--) {
        const address = await ethereum.contract.getCampaign(i);
        let info = await fetch(
          "https://centralization.sucks.af/api/campaign/" + address
        ).then(r => r.json());
        if (info.data) {
          campaigns2 = [
            ...campaigns2,
            {
              address,
              contract: new ethers.Contract(
                address,
                patronDaiCampaign.abi,
                ethereum.provider
              ),
              info: info.data
            }
          ];

          setCampaigns([...campaigns2]);
        }
      }
    }
    getCampaigns();
  }, [ethereum]);
  console.log(campaigns);
  return (
    <div className="grid-wrapper">
      <h1>Projects</h1>
      <div className="grid">
        {campaigns.map((val, idx) => (
          <Card style={{ maxWidth: "400px" }} key={idx}>
            <CardImg
              src={
                val.info &&
                (val.info.image
                  ? val.info.image
                  : "https://cdn.pixabay.com/photo/2017/10/24/07/12/question-mark-2883630_960_720.jpg")
              }
              style={{ objectFit: "cover", height: "200px" }}
            />
            <CardBody>
              <CardTitle>
                {val.info && (val.info.title ? val.info.title : "No title")}
              </CardTitle>
              <p>
                {val.info &&
                  (val.info.description
                    ? val.info.description
                    : "No description")}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div onClick={back}>Back</div>
                <Link to={"/project/" + val.address}>More</Link>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Add onClick={back} />
                <Link to={"/project/" + val.address}>
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

      {campaigns.length < 1 && <div>Loading ...</div>}
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
            <CardImg
              src={val.url}
              style={{ objectFit: "cover", height: "200px" }}
            />
            <CardBody>
              <CardTitle>{val.title}</CardTitle>
              <p>{val.description}</p>
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
