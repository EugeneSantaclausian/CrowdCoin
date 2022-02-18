import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Web3 from "../ethereum/web3";
import web3 from "web3";
import Logo from "../images/dollar.png";
import Image from "next/image";
import Factory from "../ethereum/factory.js";
import Modal from "react-bootstrap/Modal";
import { BiBookBookmark, BiCheckCircle, BiFolderOpen } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";

function Index({ campaigns }) {
  const [loading, setLoading] = useState(true);
  const [deployedCampaigns, setCampaigns] = useState([]);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState();
  const [status, setStatus] = useState();
  const [valueErr, setValueErr] = useState("");

  const refreshCampaigns = async () => {
    setLoading("loadCampaigns");
    const campaigns = await Factory.methods.getDeployedCampaigns().call();
    const newCampaigns = [...campaigns];
    const reversedCampaigns = newCampaigns.reverse();
    setCampaigns(reversedCampaigns.slice(0, 2));
    return setLoading(false);
  };

  const handleClose = () => setShow(false);
  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    if (!value) {
      return setValueErr("Enter An Amount");
    }
    setLoading(true);
    const accounts = await Web3.ethereum.request({
      method: "eth_requestAccounts",
    });
    const ethValue = web3.utils.toWei(value, "ether");
    try {
      await Factory.methods
        .createCampaign(ethValue)
        .send({ from: accounts[0] });
      setLoading(false);
      setStatus(200);
      return setTimeout(() => {
        setStatus();
        setValue();
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
  const handleShow = () => {
    setStatus();
    setShow(true);
  };

  const getCampaigns = async () => {
    setCampaigns(campaigns.reverse().slice(0, 2));
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
            className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded shadow-md"
            onClick={handleShow}
          >
            <span>Create</span>{" "}
            <BiBookBookmark size={"1.5em"} className="ml-1" />
          </button>
          <a href="/campaigns">
            <button className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded shadow-md">
              <BiFolderOpen size={"1.5em"} className="mr-1" />
              <span>View Campaigns</span>
            </button>
          </a>
        </div>

        <div className="mt-12">
          <h1 className="text-xl mb-0 ml-4">
            {loading
              ? null
              : deployedCampaigns.length === 0 && !loading
              ? "No Campaigns Found"
              : "Recent Crowd Campaigns"}
          </h1>
          <div className="mx-4">
            {loading === "loadCampaigns" ? (
              <div
                className="spinner-border spinner-border-md text-primary text-center my-12"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              deployedCampaigns.map((item) => (
                <div className="mt-3 relative" key={item}>
                  <div className="flex-auto rounded py-4 drop-shadow-xl bg-amber-200">
                    <p className="text-base font-bold px-3 truncate">{item}</p>
                    <Link
                      href={{
                        pathname: "/campaignDetails",
                        query: { id: `${item}` },
                      }}
                    >
                      <a className="text-sky-600 hover:underline hover:text-sky-800 ml-4">
                        View Details
                      </a>
                    </Link>
                    {deployedCampaigns.indexOf(item) === 0 ? (
                      <p className="flex justify-center items-center absolute top-0 right-0  bg-green-500 text-white pl-4 w-24 rounded-r rounded-l mb-1">
                        <span>New</span>
                        <BsStarFill size={"1em"} className="ml-1 text-center" />
                      </p>
                    ) : null}
                  </div>
                </div>
              ))
            )}
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
          {loading || status === 200 ? null : (
            <form
              className="my-6 mx-6"
              onSubmit={(e) => handleCreateCampaign(e)}
            >
              <label className="form-label">Set Minimum Contribution</label>
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
                  valueErr
                    ? "form-text text-danger"
                    : "form-text text-dark font-bold"
                }
              >
                {valueErr ? valueErr : `(ETH)`}
              </div>
            </form>
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
            {status === 200 ? null : (
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded shadow-md"
                onClick={(e) => handleCreateCampaign(e)}
              >
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light text-center"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <span>Create Campaign</span>
                    <BiCheckCircle size={"1.5em"} className="ml-1" />
                  </div>
                )}
              </button>
            )}
          </Modal.Footer>
        </Modal>
        {/*Modal*/}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const campaigns = await Factory.methods.getDeployedCampaigns().call();

  return {
    props: {
      campaigns,
    },
  };
}

export default Index;
