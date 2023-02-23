---
sidebar_position: 1
---

# Pay Gas for Users

## Demo

import SponsoredMintExample from '@site/src/components/SponsoredMintExample';

<SponsoredMintExample />

## Introduction

By default, your users pay for their own gas, but you can choose to sponsor some (or all) transactions for your users.

Since it's unsafe to sponsor all transactions (in which case your users could drain your funds), you need to configure *gas policies* to determine which transactions to sponsor.

Go to the `Gas Policies` section of your dashboard.  There are two ways to specify gas policies: global policies and contract policies.

## Global Policies

With global policies, you set general rules such as "I want to sponsor up to 10 transactions per hour per user." You do that under the "Global Policies" section.

<p align="center">
  <img src="/img/global_policies.png" width="60%" />
</p>

For most projects, this is all you need!  If you want more fine-grained control, read on for how to set up contract policies.

## Contract Policies

With contract policies, you can specify specific contracts (and functions on the contract) that you want your users to be able to interact with without paying gas.  You do that by creating a "Known Contract," then create a "Contract Policy" for the known contract.

### Create a known contract

Create a new known contract by clicking the "New" button in the "Known Contracts" section, then enter:

- The name of the contract (it can be any name you want; the name is only for identification purposes)
- The address of the contract.
- The ABI of the contract.

There are many ways to obtain the ABI of a contract.  If you are unsure how to obtain the ABI of *your* contracts, ask your developers.  A valid ABI should be an array like this:

```
[{
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "claim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
}]
```

Your input should look something like this:

<p align="center">
  <img src="/img/new_known_contract.png" width="60%" />
</p>

If you plan on sponsor all functions on the contract, you may also input an empty array `[]`.

Now click `Create Contract`.

### Create a new policy

You configure which transactions to sponsor by setting up *policies*.

Click `New` in the "Policies" section and set up the following parameters.

#### Strategy

Broadly speaking, there are two types of strategies:

- Pay gas for users.  Here you pay gas for your users either fully or partially.

- Charge gas in custom tokens.  Here your users pay gas, but instead of paying in ETH (or whatever the native gas token is), they pay in a custom ERC20 token, such as the token from your application/protocol.

For this tutorial, choose the `Pay gas for users` strategy from the dropdown.

#### Transactions

Now is the time to specify the transactions for whom you'd like to sponsor gas.

Click `+` under `Allowed Transactions`.  Select the function you'd like to sponsor, or select the wildcard function `*` to sponsor every function.

#### Rate Limits

To prevent malicious users from abusing the system, it's important to set up rate limits to limit the amount of transactions you sponsor.  To create a new rate limit, click `+` under `Rate Limits`.  You can set up as many rate limits as you want.

At this point, your input should look something like this:

<p align="center">
  <img src="/img/new_policy.png" width="60%" />
</p>

Click `Create Policy` to finish the setup.

## How do I pay for gas?

Ordinarily with ERC-4337, you would have to set up your own "paymasters," which are on-chain smart contracts that pay gas for users.

With ZeroKit, we simplify the task for you -- you just have to put down a credit card, and we will charge you for gas at the end of every month.

You can set up billing on the [dashboard](https://dashboard.zerodev.app/).
