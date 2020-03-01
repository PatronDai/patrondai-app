import React, { useEffect, useState } from "react";
import "./index.css";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardFooter, CardImg, CardTitle } from "shards-react";
import { Add, Check, ChevronRight } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import EthereumContext from "../../../contexts/EthereumContext";
import patronDaiCampaign from "patrondai-contracts/build/contracts/PatronDaiCampaign";
import { ethers, utils } from "ethers";
import { back } from "../../swal";

export function Create() {
  let ethereum = React.useContext(EthereumContext);
  var form = {
    url: "",
    title: "",
    description: ""
  };
  let handleChange = e => {
    form[e.target.id] = e.target.value;
    console.log(form);
  };
  let handleSubmit = async () => {
    console.log("Submit", form);
    let tx = await ethereum.contract.registerCampaign();
    const txReceipt = await tx.wait();
    console.log(txReceipt.logs);
    const decodedEvents = new utils.AbiCoder().decode(
      ["uint256", "address"],
      txReceipt.logs[1].data
    );
    console.log(decodedEvents);
    let signature = await ethereum.provider.signMessage(JSON.stringify(form));
    const response = await fetch(
      "https://centralization.sucks.af/api/campaign/" + decodedEvents[1],
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *client
        body: JSON.stringify({ data: form, signature }) // body data type must match "Content-Type" header
      }
    );
    console.log(await response.json());
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
  let [campaign, setCampaign] = useState(null);
  let { address } = useParams();
  let ethereum = React.useContext(EthereumContext);
  useEffect(() => {
    async function getCampaigns() {
      let info = await fetch(
        "https://centralization.sucks.af/api/campaign/" + address
      ).then(r => r.json());
      setCampaign({
        address,
        contract: new ethers.Contract(
          address,
          patronDaiCampaign.abi,
          ethereum.provider
        ),
        info: info.data
      });
    }
    getCampaigns();
  }, [ethereum]);
  return (
    <div
      style={{
        display: "flex",
        marginTop: "10vh",
        justifyContent: "center",
        width: "100%"
      }}
    >
      {campaign ? (
        <>
          <Card style={{ maxWidth: "400px" }}>
            <CardImg
              src={
                campaign.info &&
                (campaign.info.image
                  ? campaign.info.image
                  : "https://cdn.pixabay.com/photo/2017/10/24/07/12/question-mark-2883630_960_720.jpg")
              }
              style={{ objectFit: "cover", maxHeight: "40vh" }}
            />
            <CardBody>
              <CardTitle>
                {campaign.info &&
                  (campaign.info.title ? campaign.info.title : "No title")}
              </CardTitle>
              <p>
                {campaign.info &&
                  (campaign.info.description
                    ? campaign.info.description
                    : "No description")}
              </p>
            </CardBody>
            <CardFooter>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Funded</div>
                <div>Patrons</div>
              </div>
            </CardFooter>
          </Card>
          <div className="back" onClick={back}>
            <Add style={{ height: "5vh", marginLeft: "1vh" }} />
            <span
              style={{
                lineHeight: "5vh",
                marginRight: "7.5vh",
                fontWeight: 600
              }}
            >
              {" "}
              Back
            </span>
          </div>
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
}
