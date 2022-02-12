import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

//getProvider returns a promise the same as window.ethereum
let web3;
let ethereum;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  const provider = await detectEthereumProvider();
  web3 = new Web3(provider);
  ethereum = provider;
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/6acbe7e67e2b4f4c88558419dbcfde69"
  );
  web3 = new Web3(provider);
  ethereum = provider;
}

export default { web3, ethereum };
