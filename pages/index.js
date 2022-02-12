import React, { useEffect, useState } from "react";
import Head from "next/head";
import Web3 from "../ethereum/web3";
import Logo from "../images/dollar.png";
import Image from "next/image";
import Factory from "../ethereum/factory.js";
import Modal from "react-bootstrap/Modal";

function Index({ campaigns }) {
  const [loading, setLoading] = useState(false);
  const [deployedCampaigns, setCampaigns] = useState([]);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState();
  const [status, setStatus] = useState();
  const [valueErr, setValueErr] = useState("");

  const refreshCampaigns = async () => {
    const campaigns = await Factory.methods.getDeployedCampaigns().call();
    return setCampaigns(campaigns);
  };

  const handleClose = () => setShow(false);
  const handleCreateCampaign = async () => {
    if (!value) {
      return setValueErr("Enter An Amount");
    }
    setLoading(true);
    const accounts = await Web3.ethereum.request({
      method: "eth_requestAccounts",
    });
    try {
      await Factory.methods.createCampaign(value).send({ from: accounts[0] });
      setStatus(200);
      return setTimeout(() => {
        setStatus();
        handleClose();
        refreshCampaigns();
      }, 3000);
    } catch (error) {
      console.log(error);
      setValue();
      setStatus(400);
      setLoading(false);
      return setTimeout(() => {
        setStatus();
      }, 3000);
    }
  };
  const handleShow = () => setShow(true);

  const getCampaigns = async () => {
    setCampaigns(campaigns);
    return setLoading(false);
  };

  useEffect(() => {
    return getCampaigns();
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded shadow-md"
            onClick={handleShow}
          >
            New
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded shadow-md">
            View Campaigns
          </button>
        </div>

        <div className="mt-12">
          <h1 className="text-xl mb-0 ml-4">Available Crowd Campaigns</h1>
          <div className="mx-4">
            {deployedCampaigns.map((item) => (
              <div
                key={item}
                className="flex-auto rounded mt-3 py-4 drop-shadow-xl bg-amber-200"
              >
                <p className="text-base font-bold px-3 truncate">{item}</p>
                <a
                  href="/"
                  className="text-sky-600 hover:underline hover:text-sky-800 ml-4"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        </div>

        {/*Modal*/}
        <Modal
          show={show}
          onHide={handleClose}
          centered
          backdrop={loading ? "static" : "true"}
        >
          <Modal.Header closeButton={true} className="bg-amber-200">
            <Modal.Title>New Campaign</Modal.Title>
          </Modal.Header>
          {loading ? null : (
            <div className="my-6 mx-6">
              <label className="form-label">Minimum Amount</label>
              <input
                type="number"
                className="form-control"
                onChange={(event) => {
                  setValueErr(""), setValue(event.target.value);
                }}
              />
              <div id="emailHelp" className="form-text text-danger">
                {valueErr}
              </div>
            </div>
          )}
          <Modal.Footer className="flex justify-between border-0">
            <p
              className={
                loading
                  ? "text-base font-bold pb-2"
                  : status === 400
                  ? "text-base font-bold pb-2 text-danger"
                  : status <= 200
                  ? "text-base font-bold pb-2 text-success"
                  : null
              }
            >
              {loading
                ? "Performing Transaction: Please Wait"
                : status === 400
                ? "Transaction Failed!"
                : status === 200
                ? "Campaign Created!"
                : null}
            </p>
            <button
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded shadow-md"
              onClick={handleCreateCampaign}
            >
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm text-light text-center"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Create Campaign"
              )}
            </button>
          </Modal.Footer>
        </Modal>
        {/*Modal*/}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const campaigns = await Factory.methods.getDeployedCampaigns().call();

  return {
    props: {
      campaigns,
    },
  };
}

export default Index;
