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
import { BsFillCheckCircleFill } from "react-icons/bs";
import Campaign from "../ethereum/campaign";

export async function getServerSideProps(context) {
  const contractAddress = context.query.id;
  const campaignInstance = Campaign(context.query.id);
  const data = await campaignInstance.methods.getCampaignSummary().call();

  return {
    props: {
      campaignBalance: data[1],
      numberofReq: data[3],
      approversCount: data[2],
      contract_address: contractAddress,
    },
  };
}

function Requests({
  campaignBalance,
  numberofReq,
  approversCount,
  contract_address,
}) {
  const [loading, setLoading] = useState(false);
  const [searchReq, setSearchReq] = useState(false);
  const [loadApproval, setLoadApproval] = useState(false);
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
    if (!web3.ethereum.isMetaMask) {
      setModalText(`Please Install MetaMask`);
      setAlertStatus(400);
      setShowAlert(true);
      return setTimeout(() => {
        setStatus();
        setShowAlert(false);
      }, 3000);
    }
    try {
      const campaign = Campaign(contract_address);
      const accounts = await web3.ethereum.request({
        method: "eth_requestAccounts",
      });
      setLoadApproval(true);
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

  const createRequest = async (e) => {
    e.preventDefault();
    if (!description) {
      return setDescErr("Description is Required");
    }
    if (!value) {
      return setValueErr("Enter An Amount");
    } else if (value < 0) {
      return setValueErr("Invalid Amount");
    } else if (value > Web3.utils.fromWei(campaignBalance, "ether")) {
      return setValueErr("Request Amount cannot exceed Campaign Balance");
    }

    if (!receiver) {
      return setReceiverErr("Receiver is Required");
    }

    if (!web3.ethereum.isMetaMask) {
      setStatus(404);
      return setTimeout(() => {
        setStatus();
      }, 3000);
    }

    try {
      const accounts = await web3.ethereum.request({
        method: "eth_requestAccounts",
      });
      const Contract = Campaign(contract_address);
      const ethValue = Web3.utils.toWei(value, "ether");
      setLoading(true);
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
        <h1 className="text-xl ml-4 truncate">
          Campaign Address:
          <span className="font-bold">{contract_address}</span>
        </h1>
        <h1 className="text-xl mb-4 ml-4 truncate">
          Campaign Balance:
          <span className="font-bold">
            {Web3.utils.fromWei(campaignBalance, "ether")} (ETH)
          </span>
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

          <form className="my-6 mx-6" onSubmit={(e) => createRequest(e)}>
            {loading || status === 200 ? null : (
              <>
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
              </>
            )}

            <Modal.Footer className="flex justify-between border-0">
              <p
                className={
                  loading || status === 200
                    ? "text-base font-bold pb-2"
                    : status === 400 || 404
                    ? "text-base font-bold pb-2 text-danger"
                    : "text-base font-bold pb-2"
                }
              >
                {loading
                  ? "Performing Transaction: Please Wait"
                  : status === 400
                  ? "Transaction Failed!"
                  : status === 404
                  ? "Please Install Metamask"
                  : status === 200
                  ? "Request Created!"
                  : null}
              </p>
              {status === 200 ? null : (
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded shadow-md"
                  onClick={(e) => createRequest(e)}
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
                    <div className="flex justify-center">
                      <span>Create Request</span>
                      <BiCheckCircle size={"1.5em"} className="ml-1" />
                    </div>
                  )}
                </button>
              )}
            </Modal.Footer>
          </form>
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
            No Available Request Campaigns {}
          </p>
        ) : (
          <div className="table-responsive mt-6">
            <table className="table table-hover table-bordered shadow-md">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Description</th>
                  <th scope="col">Value (ETH)</th>
                  <th scope="col">Receipient</th>
                  <th scope="col">Approval Rate</th>
                  <th scope="col">Status</th>
                  <th scope="col">Approve</th>
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
                        <div className="progress">
                          <div
                            className={
                              Math.round(
                                (item.approvalCount / approversCount) * 100
                              ) === 0
                                ? "progress-bar bg-danger"
                                : Math.round(
                                    (item.approvalCount / approversCount) * 100
                                  ) <= 50
                                ? "progress-bar"
                                : "progress-bar bg-green-500"
                            }
                            role="progressbar"
                            style={{
                              width:
                                Math.round(
                                  (item.approvalCount / approversCount) * 100
                                ) === 0
                                  ? "25%"
                                  : `${Math.round(
                                      (item.approvalCount / approversCount) *
                                        100
                                    )}%`,
                            }}
                            aria-valuenow={`${Math.round(
                              (item.approvalCount / approversCount) * 100
                            )}%`}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {" "}
                            {Math.round(
                              (item.approvalCount / approversCount) * 100
                            )}
                            %
                          </div>
                        </div>
                      </td>
                      <td>
                        {item.complete ? (
                          <BsFillCheckCircleFill
                            size={"1.5em"}
                            className="ml-1"
                            color="#22c55e"
                          />
                        ) : (
                          "Active"
                        )}
                      </td>
                      <td>
                        {item.complete ? (
                          <BsFillCheckCircleFill
                            size={"1.5em"}
                            className="ml-1"
                            color="#22c55e"
                          />
                        ) : (
                          <button
                            onClick={() => (
                              setItemIndex(index), approveRequest(index)
                            )}
                            disabled={loadApproval}
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
