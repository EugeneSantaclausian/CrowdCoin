import Web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const contractAddress = "0xED03ad84B070b4814ABa55394214B70190D4fCA7";

const instance = new Web3.web3.eth.Contract(
  CampaignFactory.abi,
  contractAddress
);

export default instance;
