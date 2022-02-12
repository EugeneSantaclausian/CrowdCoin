// compile code will go here
const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "UTF-8");

var input = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
fs.ensureDirSync(buildPath); //creates a new directory if it does not exist

let extractedContracts = output.contracts["Campaign.sol"];

for (let contract in extractedContracts) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract + ".json"),
    extractedContracts[contract]
  );
}
