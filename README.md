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
1. Deploy an instance of an Ethernaut's contract and get the deployed address from the browser address,
2. Paste the address into `./helper-hardhat-config.js` under `networkConfig`, `4`, and the problem name,
3. Run the following command in your terminal
```
npm run <problem_name>
```

## Problem solutions

### [10. Re-entrancy](https://ethernaut.openzeppelin.com/level/0xe6BA07257a9321e755184FB2F995e0600E78c16D)

To steal the funds owned by the Reentrance contract, the ReentrancyAttacker contract sends an intial donation to itself in order to be allowed to withdraw its donations. 
The reenter() function is then called after the donation. This function withdraws the maximum balance the attacker contract is allowed to withdraw. 
When the attacker contract receives the withdrawn funds, it calls the reenter() function again and again as it keeps being transferred funds, this until the Reentrance contract runs out of ETH.
The total balance of the attaker contract is then transferred to the attacker account.
To run the solution:
```
npm run reentrancy
```

