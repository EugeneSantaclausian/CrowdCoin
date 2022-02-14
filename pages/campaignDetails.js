import React, { useEffect } from "react";
import Head from "next/head";
import Web3 from "web3";
import { useRouter } from "next/router";
import Logo from "../images/dollar.png";
import Image from "next/image";
import Campaign from "../ethereum/campaign";
import { FiChevronLeft } from "react-icons/fi";
import { BiBookBookmark } from "react-icons/bi";

export async function getServerSideProps(context) {
  const campaignInstance = Campaign(context.query.id);
  const data = await campaignInstance.methods.getCampaignSummary().call();
  const jSON_Contract = JSON.stringify(Array(campaignInstance));

  return {
    props: {
      minimumContribution: data[0],
      balance: data[1],
      contributorsCount: data[2],
      manager: data[3],
      contract: jSON_Contract,
    },
  };
}

function CampaignDetails({
  minimumContribution,
  balance,
  contributorsCount,
  manager,
  contract,
}) {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  useEffect(() => {
    return async () => {
      const contractInstance = contract;
      console.log("CONTRACT", contractInstance);
    };
  }, []);

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
          <a href="/">
            <button className="flex justify-start bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded shadow-md">
              <FiChevronLeft size={"1.5em"} className="mr-1" />{" "}
              <span>Back</span>
            </button>
          </a>

          <button className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded shadow-md">
            <span>Create Request</span>{" "}
            <BiBookBookmark size={"1.5em"} className="ml-1" />
          </button>
        </div>

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
              <input type="number" className="form-control" />
              <div
                id="emailHelp"
                className="form-text text-dark font-bold"
              ></div>
              <button className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 mt-3 rounded shadow-md">
                Contribute
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;
