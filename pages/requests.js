import React, { useState, useEffect } from "react";
import Web3 from "web3";
import web3 from "../ethereum/web3";
import Head from "next/head";
import Link from "next/link";
import Logo from "../images/dollar.png";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import { FiChevronLeft } from "react-icons/fi";
import { BiCheckCircle } from "react-icons/bi";
import Campaign from "../ethereum/campaign";

export async function getServerSideProps(context) {
  const contractAddress = context.query.id;
  const campaignInstance = Campaign(context.query.id);
  const data = await campaignInstance.methods.getCampaignSummary().call();

  return {
    props: {
      numberofReq: data[3],
      approversCount: data[2],
      contract_address: contractAddress,
    },
  };
}

function Requests({ numberofReq, approversCount, contract_address }) {
  const [loading, setLoading] = useState(false);
  const [searchReq, setSearchReq] = useState(false);
  const [loadApproval, setLoadApproval] = useState(false);
  const [loadFinalize, setLoadFinalize] = useState(false);
  const [itemIndex, setItemIndex] = useState();
  const [description, setDescription] = useState("");
  const [receiver, setReceiver] = useState("");
  const [requestsList, setRequests] = useState([]);
  const [value, setValue] = useState();
  const [status, setStatus] = useState();
  const [alertStatus, setAlertStatus] = useState();
  const [valueErr, setValueErr] = useState("");
  const [descErr, setDescErr] = useState("");
  const [receiverErr, setReceiverErr] = useState("");
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [modalText, setModalText] = useState("");
  const [newReq, setNewReq] = useState(0);
  const [reqStatus, setReqStatus] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setStatus();
    setShow(true);
  };
  const handleCloseAlert = () => setShowAlert(false);

  const getRequests = async (e) => {
    setSearchReq(true);
    const num =
      newReq === 0 ? Number(numberofReq) : Number(numberofReq) + newReq;
    const campaign = Campaign(contract_address);
    const requests = await Promise.all(
      Array(num)
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
    setRequests(requests);
    return setSearchReq(false);
  };

  const approveRequest = async (index) => {
    const campaign = Campaign(contract_address);
    setLoadApproval(true);
    try {
      const accounts = await web3.ethereum.request({
        method: "eth_requestAccounts",
      });
      await campaign.methods.approveRequest(index).send({ from: accounts[0] });
      setAlertStatus(200);
      setModalText("You have voted to approve this Spending Request!");
      setShowAlert(true);
      setReqStatus(reqStatus + 1);
      return setLoadApproval(false);
    } catch (error) {
      setModalText(`${error.message}`);
      setAlertStatus(400);
      setShowAlert(true);
      return setLoadApproval(false);
    }
  };

  const finalizeRequest = async (index) => {
    const campaign = Campaign(contract_address);
    setLoadFinalize(true);
    try {
      const accounts = await web3.ethereum.request({
        method: "eth_requestAccounts",
      });
      await campaign.methods.confirmApproval(index).send({ from: accounts[0] });
      setAlertStatus(200);
      setModalText("Transaction Completed: Request Funds have been sent");
      setShowAlert(true);
      setReqStatus(reqStatus + 1);
      return setLoadFinalize(false);
    } catch (error) {
      setModalText(`${error.message}`);
      setAlertStatus(400);
      setShowAlert(true);
      return setLoadFinalize(false);
    }
  };

  const createRequest = async (e) => {
    e.preventDefault();
    if (!description) {
      return setDescErr("Description is Required");
    }
    if (!value) {
      return setValueErr("Enter An Amount");
    } else if (value < 0) {
      return setValueErr("Invalid Amount");
    }

    if (!receiver) {
      return setReceiverErr("Receiver is Required");
    }

    setLoading(true);
    const accounts = await web3.ethereum.request({
      method: "eth_requestAccounts",
    });
    const Contract = Campaign(contract_address);
    const ethValue = Web3.utils.toWei(value, "ether");
    try {
      await Contract.methods
        .createRequest(description, ethValue, receiver)
        .send({ from: accounts[0] });
      setLoading(false);
      setStatus(200);
      setNewReq(newReq + 1);
      return setTimeout(() => {
        setStatus();
        setValue();
      }, 3000);
    } catch (error) {
      setStatus(400);
      setLoading(false);
      return setTimeout(() => {
        setStatus();
      }, 3000);
    }
  };

  useEffect(() => {
    return getRequests();
  }, [newReq, reqStatus]);

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
          <Link
            href={{
              pathname: "/campaignDetails",
              query: { id: `${contract_address}` },
            }}
          >
            <button className="flex justify-start bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded shadow-md">
              <FiChevronLeft size={"1.5em"} className="mr-1" />{" "}
              <span>Back To Details</span>
            </button>
          </Link>

          <button
            className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded shadow-md"
            onClick={handleShow}
          >
            Add Request
          </button>
        </div>

        <h1 className="display-6 font-bold ml-4">Spending Requests</h1>
        <h1 className="text-xl mb-4 ml-4 truncate">
          Campaign Address:
          <span className="font-bold">{contract_address}</span>
        </h1>

        {/*Add Request Modal*/}
        <Modal
          show={show}
          onHide={handleClose}
          centered
          backdrop={loading ? "static" : "true"}
        >
          <Modal.Header closeButton={true} className="bg-amber-200">
            <Modal.Title>New Request</Modal.Title>
          </Modal.Header>

          {loading ? (
            <div className="text-base font-bold text-dark py-4 ml-2">
              <div
                className="spinner-border spinner-border-sm text-primary text-center"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>{" "}
              Transaction In Progress: Please Wait
            </div>
          ) : status === 200 ? (
            <p className="text-base font-bold text-success py-4 ml-2">
              Request Created!
            </p>
          ) : status === 400 ? (
            <p className="text-base font-bold text-danger py-4 ml-2">
              Transaction Failed!
            </p>
          ) : (
            <form className="my-6 mx-6" onSubmit={(e) => createRequest(e)}>
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setDescErr(""), setDescription(e.target.value);
                }}
              />
              <div id="emailHelp" className="form-text text-danger mb-3">
                {descErr}
              </div>

              <label className="form-label">Value</label>
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
                    ? "form-text text-danger mb-3"
                    : "form-text text-dark font-bold mb-3"
                }
              >
                {valueErr ? valueErr : `(ETH)`}
              </div>

              <label>Receiver</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setReceiverErr(""), setReceiver(e.target.value);
                }}
              />
              <div id="emailHelp" className="form-text text-danger  mb-3">
                {receiverErr}
              </div>

              {status === 200 ? null : (
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded shadow-md"
                  onClick={(e) => createRequest(e)}
                >
                  {loading ? (
                    <div
                      className="spinner-border spinner-border-sm my-3 text-light text-center"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <span>Create Request</span>
                      <BiCheckCircle size={"1.5em"} className="ml-1" />
                    </div>
                  )}
                </button>
              )}
            </form>
          )}
        </Modal>
        {/*Add Request Modal*/}

        {/*Modal or Notifications*/}
        <Modal show={showAlert} onHide={handleCloseAlert}>
          <Modal.Header
            closeButton
            className={alertStatus === 200 ? "bg-green-500" : "bg-red-400"}
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

        {/*Spending Requests*/}

        {searchReq ? (
          <div
            className="spinner-border spinner-border text-primary text-center"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : !searchReq && requestsList.length === 0 ? (
          <p className="text-2xl py-28 ml-4 text-slate-500">
            No Available Request Campaigns
          </p>
        ) : (
          <div className="table-responsive mt-6">
            <table className="table table-striped table-hover table-bordered shadow-md">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Description</th>
                  <th scope="col">Value (ETH)</th>
                  <th scope="col">Receipient</th>
                  <th scope="col">Approvals</th>
                  <th scope="col">Status</th>
                  <th scope="col">Approve</th>
                  <th scope="col">Finalize</th>
                </tr>
              </thead>
              <tbody>
                {requestsList.map((item, index) => {
                  return (
                    <tr key={item.description}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.description}</td>
                      <td>{Web3.utils.fromWei(item.value)}</td>
                      <td>{item.receiver}</td>
                      <td>
                        {item.approvalCount}/{approversCount}
                      </td>
                      <td>{item.complete ? "Completed" : "Active"}</td>
                      <td>
                        {item.complete ? (
                          "Completed"
                        ) : (
                          <button
                            onClick={() => (
                              setItemIndex(index), approveRequest(index)
                            )}
                            className="flex justify-start bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded shadow-md"
                          >
                            {loadApproval && index === itemIndex ? (
                              <div
                                className="spinner-border spinner-border-sm text-light text-center"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            ) : (
                              "Approve"
                            )}
                          </button>
                        )}
                      </td>
                      <td>
                        {item.complete ? (
                          "Completed"
                        ) : (
                          <button
                            onClick={() => (
                              setItemIndex(index), finalizeRequest(index)
                            )}
                            className="flex justify-start bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded shadow-md"
                          >
                            {loadFinalize && index === itemIndex ? (
                              <div
                                className="spinner-border spinner-border-sm text-light text-center"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            ) : (
                              "Finalize"
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/*Spending Requests*/}
      </div>
    </div>
  );
}

export default Requests;
