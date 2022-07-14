# The Ethernaut by OpenZeppelin

This repository contains my solutions to the [Ethernaut](https://ethernaut.openzeppelin.com/) problems by [OpenZeppelin](https://www.openzeppelin.com/)

## Getting Started

### Prerequisites

This project requires [Node.js](https://nodejs.org/en/) which you can download from [here](https://nodejs.org/en/download/). To check the installation, run the following command in your terminal:

```
node --version
```

We are going to clone this repository using [git](https://git-scm.com/). To check if you have git installed, run this command in your terminal:

```
git --version
```

### Installation

1. Clone the repo

```
git clone https://github.com/Niceural/ethernaut-problems.git
```

2. Install NPM packages

```
npm install
```

3. Create a `.env` file in the project's root and paste the environment variables following the example in `.env.example`

4. Test the installation by running `hh compile`

## Usage

The smart contracts solution to each problems can be found in the folder `./contracts/<problem>/`. The deploy script are located in `./deploy/`. `./scripts/` contains the scripts to execute the attackers contracts.

To run a solution, do the following:

1. Deploy an instance of an Ethernaut's contract and get the deployed address the browser console,
2. Paste the address into `./helper-hardhat-config.js` under `networkConfig`, `4`, and the problem name,
3. Run the following command in your terminal

```
npm run <problem_name>
```

## Problem solutions

### [1. Fallback](https://ethernaut.openzeppelin.com/level/0x9CB391dbcD447E645D6Cb55dE6ca23164130D008)

The attacker first contributes to the Fallback contract to be allowed to send ETH to the contract. The attacker then sends ETH to the Fallback contract resulting in the owner address of the contract being changed to the attacker's. Finally, the attacker calls the withdraw() function and the balance of the Fallback contract is transferred to the attacker. To run the solution:

```
$ npm run fallback
```

### [2. Fallout](https://ethernaut.openzeppelin.com/level/0x5732B2F88cbd19B6f01E3a96e9f0D90B917281E5)

To claim ownership of the Fallout contract, simply call the Fal1out function on the contract and the contract owner will be set to the caller. To run the solution:

```
$ npm run fallback
```

### [3. Coin Flip](https://ethernaut.openzeppelin.com/level/0x4dF32584890A0026e56f7535d0f2C6486753624f)

To guess the correct outcome we simply need to copy and paste the logic for computing the outcome to the attacker contract and pass it to the flip method of the CoinFlip contract. To run the solution:

```
$ npm run coinFlip
```

### [4. Telephone](https://ethernaut.openzeppelin.com/level/0x0b6F6CE4BCfB70525A31454292017F640C10c768)

To claim ownership of the contract we create a contract which will call the changeOwner for us. That way `msg.sender` will be the address of the attacker contract and `tx.origin` will be the address of the attacker account calling on the attacker contract. To run the solution:

```
$ npm run telephone
```

### [5. Token](https://ethernaut.openzeppelin.com/level/0x63bE8347A617476CA461649897238A31835a32CE)

When `Token.transfer()` checks if the sender has enough balance, it does not perform an underflow check for `uint256`. Therefore, although the actual value of `balances[msg.sender] - _value` is negative, it will be stored as a positive (and most likely very big) number with a `uint256` data type. The owner of the 20 tokens can just transfer any amount of tokens to a receiver, making sure that the receiver's balance does not overflow.
To run the solution:

```
$ npm run token
```

### [10. Re-entrancy](https://ethernaut.openzeppelin.com/level/0xe6BA07257a9321e755184FB2F995e0600E78c16D)

To steal the funds owned by the Reentrance contract, the ReentrancyAttacker contract donates some funds to itself, by calling the Reentrancedonate() function, in order to be allowed to withdraw its donations.
The ReentrancyAttacker.reenter() function is then called after the donation. This function withdraws the maximum balance the attacker contract is allowed to withdraw.
When the attacker contract receives the withdrawn funds, it calls the reenter() function again and again as it keeps being transferred funds, this until the Reentrance contract runs out of ETH.
The total balance of the attacker contract is then transferred to the attacker account.
To run the solution:

```
$ npm run reentrancy
```
