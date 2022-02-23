import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Web3 from "web3";
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";
import Logo from "../images/dollar.png";
import Image from "next/image";
import Campaign from "../ethereum/campaign";
import { FiChevronLeft } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";

export async function getServerSideProps(context) {
  const campaignInstance = Campaign(context.query.id);
  const data = await campaignInstance.methods.getCampaignSummary().call();
  const campaignName = await campaignInstance.methods.campaignName().call();
  const contractAddress = context.query.id;

  return {
    props: {
      minimumContribution: data[0],
      balance: data[1],
      contributorsCount: data[2],
      numberofReq: data[3] - data[5],
      manager: data[4],
      contractAddress,
      campaignName,
    },
  };
}

function CampaignDetails({
  minimumContribution,
  balance,
  contributorsCount,
  numberofReq,
  manager,
  contractAddress,
  campaignName,
}) {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [value, setValue] = useState();
  const [status, setStatus] = useState();
  const [contributeCount, setContribute] = useState(0);
  const [valueErr, setValueErr] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState();
  const [details, setDetails] = useState();
  const [modalText, setModalText] = useState("");

  const router = useRouter();
  const {
    query: { id },
  } = router;

  const handleCloseAlert = () => setShowAlert(false);

  const handleContribute = async (e) => {
    e.preventDefault();
    if (!value) {
      return setValueErr("Enter An Amount");
    } else if (value < 0) {
      return setValueErr("Invalid Amount");
    } else if (!web3.ethereum.isMetaMask) {
      setModalText(`Please Install MetaMask`);
      setStatus(400);
      setAlertStatus(400);
      setShowAlert(true);
      return setTimeout(() => {
        setStatus();
        setShowAlert(false);
      }, 3000);
    }

    try {
      const accounts = await web3.ethereum.request({
        method: "eth_requestAccounts",
      });
      const Contract = Campaign(contractAddress);
      setLoading(true);
      await Contract.methods
        .contribute()
        .send({ from: accounts[0], value: Web3.utils.toWei(value, "ether") });
      setLoading(false);
      setStatus(200);
      setModalText("Transaction Successful!");
      setAlertStatus(200);
      setShowAlert(true);
      setContribute(contributeCount + 1);
      return setTimeout(() => {
        setStatus();
        setValue();
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setModalText(`${error.message}`);
      setStatus(400);
      setAlertStatus(400);
      setShowAlert(true);
      setLoading(false);
      return setTimeout(() => {
        setStatus();
        setShowAlert(false);
      }, 3000);
    }
  };

  useEffect(() => {
    return async () => {
      setRefresh(true);
      const campaignInstance = Campaign(contractAddress);
      const data = await campaignInstance.methods.getCampaignSummary().call();
      setDetails(data);
      return setRefresh(false);
    };
  }, [contributeCount]);

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
              query: { id: `${contractAddress}` },
            }}
          >
            <button className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded shadow-md">
              Spending Requests({details ? details[3] : `${numberofReq}`})
            </button>
          </Link>
        </div>

        <h1 className="display-6 font-bold ml-4">{campaignName}</h1>

        <h1 className="text-xl mb-4 ml-4 truncate">
          Campaign Address:
          <span className="font-bold">{id}</span>
        </h1>

        <div>
          {refresh ? (
            <div
              className="spinner-border spinner-border-md text-primary text-center my-12"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
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
                          The manager created this campaign and can create
                          requests to withdraw money
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
                          {details ? details[2] : contributorsCount}
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
                          You must contribute at least this much Ethereum to
                          become an Approver
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
                          {details
                            ? Web3.utils.fromWei(details[1])
                            : Web3.utils.fromWei(balance)}{" "}
                          (ETH)
                        </h5>
                        <p className="card-text">
                          The Balance is how much this Campaign has left to
                          spend
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
                    disabled={loading}
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

              {/*Modal or Notifications*/}
              <Modal show={showAlert} onHide={handleCloseAlert}>
                <Modal.Header
                  closeButton
                  className={
                    alertStatus === 200 ? "bg-green-500" : "bg-red-400"
                  }
                >
                  <Modal.Title className="text-white">
                    {alertStatus === 200 ? "Success" : "Error"}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p className="w-full whitespace-normal">{modalText}</p>
                </Modal.Body>
              </Modal>
              {/*Modal For Notifications*/}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;
