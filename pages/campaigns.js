import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Logo from "../images/dollar.png";
import Image from "next/image";
import Factory from "../ethereum/factory.js";

function Campaigns({ campaigns }) {
  const [loading, setLoading] = useState(true);
  const [campaignNames, setCampaignNames] = useState([]);
  const deployedCampaigns = Array(...campaigns).reverse();

  const getCampaigns = async () => {
    setLoading("loadCampaigns");
    let myList = campaigns;
    const allCampaigns = await Promise.all(
      myList.map((element) => {
        return Factory.methods.deployedCampaigns(element).call();
      })
    );
    setCampaignNames(allCampaigns.reverse());
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
        <div className="flex justify-start mt-6 mb-5 ml-4 mr-4">
          <a href="/">
            <button className="flex justify-start bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded shadow-md">
              Go Home
            </button>
          </a>
        </div>

        <div className="mt-12">
          <h1 className="text-xl mb-0 ml-4">
            Total Number of Campaigns:{" "}
            <span className="font-bold">{campaigns.length}</span>
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
              deployedCampaigns.map((item, index) => (
                <div
                  key={item}
                  className="flex-auto rounded mt-3 py-4 drop-shadow-xl bg-amber-200"
                >
                  <p className="text-xl font-bold underline px-3 truncate">
                    {campaignNames[index]}
                  </p>
                  <p className="text-base px-3 truncate">{item}</p>
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
                </div>
              ))
            )}
          </div>
        </div>
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

export default Campaigns;
