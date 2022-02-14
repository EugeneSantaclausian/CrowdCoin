import Web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const contractAddress = "0xbf7678ad697A8960d090a7Df45501B84dEF84d7e";

const instance = new Web3.web3.eth.Contract(
  CampaignFactory.abi,
  contractAddress
);

export default instance;
