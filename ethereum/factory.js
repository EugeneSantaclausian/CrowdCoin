import Web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const contractAddress = "0x7ADdA8170804DB4c2E2649Ddac0D27dEF5Aef8AA";

//const instance = new web3.eth.Contract(CampaignFactory.abi, contractAddress);

const instance = new Web3.web3.eth.Contract(
  CampaignFactory.abi,
  contractAddress
);

export default instance;
