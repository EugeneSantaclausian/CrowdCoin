import Web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const contractAddress = "0x5fd0e1C90E8af0f915b08535700425Fe863e36dA";

const instance = new Web3.web3.eth.Contract(
  CampaignFactory.abi,
  contractAddress
);

export default instance;
