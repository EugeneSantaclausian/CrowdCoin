import Web3 from "./web3";
import CompiledCampaign from "./build/Campaign.json";

export default (address) => {
  return new Web3.web3.eth.Contract(CompiledCampaign.abi, address);
};
