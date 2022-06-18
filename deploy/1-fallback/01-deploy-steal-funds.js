const { getNamedAccounts, network, deployments, ethers } = require("hardhat");
const { networkConfig } = require("../../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  if (chainId == 4) {
    const aFallback = networkConfig[chainId]["fallback"];
    log("Deploying StealFunds contract...");
    const stealFunds = await deploy("StealFunds", {
      from: deployer,
      args: [aFallback],
      log: true,
      waitConfirmations: 1,
    });
    log("============================================");
  }
};

module.exports.tags = ["all", "fallback"];
