// contract test code will go here
const assert = require("assert");
const { beforeEach } = require("mocha");
const Web3 = require("web3");

const web3 = new Web3("HTTP://127.0.0.1:7545"); //Web 3 Provider

const campaignFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(campaignFactory.abi)
    .deploy({
      data: campaignFactory.evm.bytecode.object,
    })
    .send({ from: accounts[0], gas: "2000000" });

  await factory.methods
    .createCampaign("150")
    .send({ from: accounts[0], gas: "2000000" });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("Campaigns Contracts", () => {
  it("Deploys Campaign Factory & Campagin Contract", () => {
    assert.ok(factory.options.address);
  });

  it("Check Manager Address", async () => {
    const manager = await campaign.methods.manager;
    assert.ok(accounts[0], manager);
  });

  it("Test for Making Contributions", async () => {
    await campaign.methods
      .contribute()
      .send({ value: "200", from: accounts[1] });
    const isContributor = await campaign.methods.contributors(accounts[1]);
    assert.ok(isContributor);
  });
});
