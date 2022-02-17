import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Web3 from "web3";
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";
import Logo from "../images/dollar.png";
import Image from "next/image";
import Campaign from "../ethereum/campaign";
import { FiChevronLeft } from "react-icons/fi";

export async function getServerSideProps(context) {
  const campaignInstance = Campaign(context.query.id);
  const data = await campaignInstance.methods.getCampaignSummary().call();
  const contractAddress = context.query.id;

  return {
    props: {
      minimumContribution: data[0],
      balance: data[1],
      contributorsCount: data[2],
      numberofReq: data[3],
      manager: data[4],
      contract_address: contractAddress,
    },
  };
}

function CampaignDetails({
  minimumContribution,
  balance,
  contributorsCount,
  numberofReq,
  manager,
  contract_address,
}) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();
  const [status, setStatus] = useState();
  const [valueErr, setValueErr] = useState("");

  const router = useRouter();
  const {
    query: { id },
  } = router;

  const handleContribute = async (e) => {
    e.preventDefault();
    if (!value) {
      return setValueErr("Enter An Amount");
    } else if (value < 0) {
      return setValueErr("Invalid Amount");
    }
    setLoading(true);
    const accounts = await web3.ethereum.request({
      method: "eth_requestAccounts",
    });
    const Contract = Campaign(contract_address);
    try {
      await Contract.methods
        .contribute()
        .send({ from: accounts[0], value: Web3.utils.toWei(value, "ether") });
      setLoading(false);
      setStatus(200);
      return setTimeout(() => {
        setStatus();
        setValue();
      }, 3000);
    } catch (error) {
      console.log(error);
      setStatus(400);
      setLoading(false);
      return setTimeout(() => {
        setStatus();
      }, 3000);
    }
  };

  return (
    <div>
      <Head>
        <title>CrowdCoin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex justify-center border-b-2 bg-slate-800">
        <div className="px-3">
          <Image src={Logo} alt="Logo" width={70} height={70} />
        </div>
        <h1 className="text-3xl text-center text-white py-4">CrowdCoin</h1>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="flex justify-between mt-6 mb-5 ml-4 mr-4">
          <a href="/campaigns">
            <button className="flex justify-start bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded shadow-md">
              <FiChevronLeft size={"1.5em"} className="mr-1" />{" "}
              <span>Campaigns List</span>
            </button>
          </a>

          <Link
            href={{
              pathname: "/requests",
              query: { id: `${contract_address}` },
            }}
          >
            <button className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded shadow-md">
              Spending Requests({`${numberofReq}`})
            </button>
          </Link>
        </div>

        <h1 className="display-6 font-bold ml-4">Details</h1>

        <h1 className="text-xl mb-4 ml-4 truncate">
          Campaign Address:
          <span className="font-bold">{id}</span>
        </h1>

        <div className="row">
          <div className="col-lg-8 col-sm-12">
            <div className="row row-cols-2">
              <div className="col">
                <div className="card mx-1 my-2 shadow-md">
                  <h5 className="card-header font-bold bg-slate-200">
                    {" "}
                    Manager Address
                  </h5>
                  <div className="card-body">
                    <h5 className="card-title text-wrap font-bold">
                      {manager}
                    </h5>
                    <p className="card-text">
                      The manager created this campaign and can create requests
                      to withdraw money
                    </p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card mx-1 my-2 shadow-md">
                  <h5 className="card-header font-bold bg-slate-200">
                    {" "}
                    Total Contributors
                  </h5>
                  <div className="card-body">
                    <h5 className="card-title text-wrap font-bold">
                      {contributorsCount}
                    </h5>
                    <p className="card-text">
                      Number of People who have donated to this Campaign
                    </p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card mx-1 my-2 shadow-md">
                  <h5 className="card-header font-bold bg-slate-200">
                    {" "}
                    Minimum Contribution
                  </h5>
                  <div className="card-body">
                    <h5 className="card-title text-wrap font-bold">
                      {Web3.utils.fromWei(minimumContribution)} (ETH)
                    </h5>
                    <p className="card-text">
                      You must contribute at least this much Ethereum to become
                      an Approver
                    </p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card mx-1 my-2 shadow-md">
                  <h5 className="card-header font-bold bg-slate-200">
                    {" "}
                    Balance
                  </h5>
                  <div className="card-body">
                    <h5 className="card-title text-wrap font-bold">
                      {Web3.utils.fromWei(balance)} (ETH)
                    </h5>
                    <p className="card-text">
                      The Balance is how much this Campaign has left to spend
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-12 bg-slate-200 rounded">
            <div className="my-6 mx-6">
              <label className="form-label">Amount To Contribute</label>
              <input
                type="number"
                className="form-control"
                onChange={(event) => {
                  setValueErr(""), setValue(event.target.value);
                }}
              />
              <div
                id="emailHelp"
                className={
                  status === 200
                    ? "form-text font-bold text-success"
                    : status === 400
                    ? "form-text font-bold text-danger"
                    : valueErr
                    ? "form-text text-danger"
                    : "form-text text-dark font-bold"
                }
              >
                {status === 200
                  ? "Transaction Success!"
                  : status === 400
                  ? "Transaction Failed!"
                  : valueErr
                  ? valueErr
                  : `(ETH)`}
              </div>
              <button
                className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 mt-3 rounded shadow-md"
                onClick={(e) => handleContribute(e)}
              >
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light text-center"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Contribute"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;
