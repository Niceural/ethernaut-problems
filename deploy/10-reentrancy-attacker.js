const { network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const chainId = network.config.chainId;
  if (chainId == 4) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const blockConfirm = 1;
    const aReentrance = networkConfig[chainId]["reentrancy"];

    const arguments = [aReentrance];
    const reentrancyAttacker = await deploy("ReentrancyAttacker", {
      from: deployer,
      args: arguments,
      log: true,
      waitConfirmations: blockConfirm,
    });
  }
};

module.exports.tags = ["all", "reentrancy"];
