import Web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const contractAddress = "0x29F5aA85087a41FF7fAB064c098D7E8842976534";

const instance = new Web3.web3.eth.Contract(
  CampaignFactory.abi,
  contractAddress
);

export default instance;
