---
sidebar_position: 1
---

# Gasless Transactions

One of the biggest barrier to using Web3 is gas.  With existing Web3 onboarding solutions, you might be able to create a wallet for your user, but they still have to buy a little bit of ETH (or whatever native token is used for gas) before they can interact with your app.

With account abstraction, gas can be paid by a third party, and paid in any tokens.  In this tutorial, we will set up a gas-free NFT mint, to show how you can let your users interact with your app even from an empty wallet!

## Set up ZeroKit

Follow the instructions in [Getting Started](/getting-started) to set up your project.

## Set up the UI

Use the code in the [Sponsored Mint Example](/examples/sponsored-mint) to set up a UI.  At this point you should have a frontend like this:

import SponsoredMintExample from '@site/src/components/SponsoredMintExample';

<SponsoredMintExample projectId="ae7b8b91-cbee-4ad9-b419-0dd35185296c" />

<br/>

The mint button won't work, however, since this is an empty wallet and we haven't set up the gas sponsoring policy yet, which is what we are going to do next.

## Set up gas policies in your dashboard

Go to the [ZeroDev dashboard](https://dashboard.zerodev.app/) and create a project for Polygon Mumbai.  Then open up the "Gas Policies" section.

While sponsoring gas is great for your users, it's dangerous to sponsor everything, as a malicious user may decide to spam transactions and drain your funds.  That's why we need to set up gas policies.

With ZeroKit, there are two ways to specify gas policies: contract policies and global policies.

### Contract Policies

With contract policies, you can specify specific contracts (and functions on the contract) that you want your users to be able to interact with without paying gas.  You do that by creating a "Known Contract," then create a "Contract Policy" for the known contract.

### Global Policies

With global policies, you set general rules such as "I want to sponsor up to 10 transactions per hour per user." You do that under the "Global Policies" section.

For this tutorial, we will set up a global policy since that's simpler.  Create a policy like this (make sure to save):

<p align="center">
  <img src="/img/global_policies.png" width="60%" />
</p>

Now try minting again!  You should be able to mint without paying gas now.

<SponsoredMintExample />

## How do I pay for gas?

Ordinarily with ERC-4337, you would have to set up your own "paymasters," which are on-chain smart contracts that pay gas for users.

With ZeroKit, we simplify the task for you -- you just have to put down a credit card, and we will charge you for gas at the end of every month.

Since this tutorial runs on Polygon Mumbai, you did not have to put down a credit card.  For production networks, you can set up billing on the [dashboard](https://dashboard.zerodev.app/).