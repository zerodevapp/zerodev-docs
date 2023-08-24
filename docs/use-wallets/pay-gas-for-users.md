---
sidebar_position: 1
---

# Pay Gas for Users

## Demo

import SponsoredMintExample from '@site/src/components/SponsoredMintExample';

<SponsoredMintExample />

## Introduction

By default, your users pay for their own gas, but you can choose to sponsor some (or all) transactions for your users.  When you do, ZeroDev fronts the gas for your users, and charges your credit card on a monthly basis for the gas your users used.

Since it's unsafe to sponsor all transactions (in which case your users could drain your funds), you need to configure *gas policies* to determine which transactions to sponsor.

If you want to configure gas policies programmatically, check out [the API](https://zerodev-api.readme.io/reference/addpolicytoproject).  Otherwise, go to the `Gas Policies` section of [your dashboard](https://dashboard.zerodev.app/) to follow along this tutorial.

## Policy Types

There are three types of policies on ZeroDev:

- Project policies: policies that apply to the entire project. 
- Contract policies: policies that apply to specific contracts.
- Wallet policies: policies that apply to specific wallet addresses.

## Rate Limit Types

When you create a new policy, you set up one or more *rate limits*.

There are four types of rate limits:

- Amount: limit by the amount of gas
- Request: limit by the number of requests
- Gas Price: limit by the curren gas price
- Amount per txn: limit by the amount of gas per transaction

## Policy examples

The policies and rate limits are hopefully intuitive, but here are some common examples in case they are helpful.  We will be using Polygon (MATIC) in these examples.

### Sponsor up to 1 MATIC every hour for the entire project

Here we create a project policy:

<p align="center">
  <img src="/img/gas_policy_example_1.png" width="80%" />
</p>

### Sponsor 100 transactions per minute for a specific contract

Here we create a contract policy:

<p align="center">
  <img src="/img/gas_policy_example_2.png" width="80%" />
</p>

### Sponsor transactions for a specific function when gas price is below 50 GWEI

Here we create a contract policy:

<p align="center">
  <img src="/img/gas_policy_example_3.png" width="80%" />
</p>

### Sponsor 100 transactions per hour for a specific address

Here we create a wallet policy:

<p align="center">
  <img src="/img/gas_policy_example_4.png" width="80%" />
</p>