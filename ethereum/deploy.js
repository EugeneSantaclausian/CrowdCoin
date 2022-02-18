// deploy code will go here
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const mnemonic =
  "oval jeans song taxi trumpet bullet scrap hedgehog ostrich course marriage width";
const url = "https://rinkeby.infura.io/v3/6acbe7e67e2b4f4c88558419dbcfde69";

const provider = new HDWalletProvider(mnemonic, url);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Deploying From Account 1:", accounts[0]);

  //Deployment of the Contract
  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({
      data: compiledFactory.evm.bytecode.object,
      arguments: ["Campain Factory Contract Initial Deployment"],
    })
    .send({ from: accounts[0], gas: "3000000" });
  console.log("RESULT:", result);
  provider.engine.stop(); //Ends Deployment Thread
};

deploy();
