// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

interface IReentrance {
  using SafeMath for uint256;

  function donate(address _to) external payable;

  function balanceOf(address _who) external view returns (uint balance);

  function withdraw(uint _amount) external;

  receive() external payable;
}