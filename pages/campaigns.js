import React from "react";
import Head from "next/head";
import Logo from "../images/dollar.png";
import Image from "next/image";
import Factory from "../ethereum/factory.js";
import { FiChevronLeft } from "react-icons/fi";

function Campaigns({ campaigns }) {
  const deployedCampaigns = Array(...campaigns);

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
              <FiChevronLeft size={"1.5em"} className="mr-1" />{" "}
              <span>Back</span>
            </button>
          </a>
        </div>

        <div className="mt-12">
          <h1 className="text-xl mb-0 ml-4">
            Total Number of Campaigns:{" "}
            <span className="font-bold">{campaigns.length}</span>
          </h1>
          <div className="mx-4">
            {deployedCampaigns.map((item) => (
              <div
                key={item}
                className="flex-auto rounded mt-3 py-4 drop-shadow-xl bg-amber-200"
              >
                <p className="text-base font-bold px-3 truncate">{item}</p>
                <a
                  href="/campaigns"
                  className="text-sky-600 hover:underline hover:text-sky-800 ml-4"
                >
                  View Details
                </a>
              </div>
            ))}
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
