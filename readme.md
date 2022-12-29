# Decentralized Escrow Application

This is an Escrow Dapp built with

* [Hardhat](https://hardhat.org/).
* [Next JS](https://nextjs.org/)
* [Typescript](https://www.typescriptlang.org/)


## Project Layout

There are three main top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies in the top-level directory with `npm install`.

After you have installed hardhat locally, you can use commands to test and compile the contracts, among other things. To learn more about these commands run `npx hardhat help`.

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/artifact` and the typechain genrated code in `/app/components/artifacts` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.ts` file.

Deploy contract using `npx hardhat run scripts/deploy.ts`. this will generate `/app/components/artifacts/escrowManager.config.ts` with the deployed address to mke it available for the front end. You can deploy to goerli network with `npx hardhat run scripts/deploy.ts --network goerli`

## Front-End

`cd` into the `/app` directory and run `npm install`

To run the front-end application run `npm run dev` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

