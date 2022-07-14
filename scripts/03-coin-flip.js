const { ethers, network, waffle } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");

async function attack() {
  const chainId = network.config.chainId;
  if (chainId == 4) {
    const waitBlockConfirmations = 1;
    const provider = waffle.provider;

    const cCoinFlipAttacker = await ethers.getContract("CoinFlipAttacker");

    const winsBefore = await cCoinFlipAttacker.getConsecutiveWins();
    console.log("Wins before: ", winsBefore.toString());

    console.log("Attacking...");
    let tx, wins;
    for (let i = 0; i < 11; i++) {
      wins = await cCoinFlipAttacker.getConsecutiveWins();
      console.log("consecutive wins: ", wins.toString());
      tx = await cCoinFlipAttacker.guessAndPlay();
      await tx.wait();
    }

    const winsAfter = await cCoinFlipAttacker.getConsecutiveWins();
    console.log("Wins after:", winsAfter.toString());
  }
}

attack()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
