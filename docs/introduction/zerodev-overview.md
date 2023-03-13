---
sidebar_position: 1
slug: /
---

# ZeroDev Overview

ZeroDev is a developer framework for building wallets and DApps powered by account abstraction (AA).  This is accomplished through four product pillars:

- A smart contract **wallet kernel** designed for quickly building AA wallets on top.
- An **SDK** for interacting with AA wallets and thus building powerful Web3 experiences.
- A set of **APIs** for managing the infrastructure associated with AA wallets, such as paymasters.
- A **meta bundler network** that spreads AA transactions across bundlers to ensure high uptime.

TLDR: ZeroDev is everything you need for building production-grade AA applications.

If you are not sure what AA is, [read this first](/introduction/why-account-abstraction).  Otherwise, Let's dive into ZeroDev.

## Wallet Kernel

At the core of ZeroDev is the wallet kernel -- an implementation of a ERC-4337-compatible smart contract wallet that is designed to be extended.

On its own, the wallet kernel is already a complete wallet (or more precisely, an on-chain "account").  It supports all the most common functionalities that people typically associate with smart contract wallets, such as bundling transactions, verifying signatures, etc.

What makes the wallet a *kernel*, however, is that it can be extended.  We have designed a *wallet plugin framework* where developers can write solidity code to build app-specific wallet features, without worrying about implementing the core wallet functionalties such as sending transactions, validating signatures, etc.

By building on top of ZeroDev, you can vastly shorten the time it takes to ship an AA wallet, while ensuring that the core of the wallet is highly optimized, audited, and compatible with AA standards (e.g. ERC-4337).

## Account Abstraction SDK

AA wallets expose a set of powerful interfaces, and the DApp (or the wallet UI) needs to be able to talk to these interfaces in order to take advantage of AA features such as bundling transactions.

To that end, ZeroDev provides an SDK with both an Ethers and a Wagmi API for interacting with AA wallets.

The SDK also integrates with MPC solutions so it supports social logins out of the box, enabling your users to create AA wallets from the comfort of OAuth.

## Infrastructure API

Account abstraction, as currently implemented in ERC-4337, requires a set of infrastructure, notably including bundlers and paymasters.  ZeroDev works with infrastructure providers to provide access to these services, but you may need to configure the infrastructure to your needs.

As an example, you may want to use paymasters to sponsor gas for minting NFTs in your app, but you may only want to spnosor up to 10 transactions per user.

ZeroDev provides an infrastructure API and dashboard for AA-related infra such as paymasters.  Through our API, you can easily set up granular rules and policies that fit the needs of your project.

## Meta Bundler Network

In ERC-4337, bundlers are the underlying nodes that handle AA transactions.  Therefore, reliable access to bundlers is key to building a smooth AA experience.

However, since the AA ecosystem is at an early stage of development, bundlers are not yet as reliable as normal Ethereum nodes such as those provided by Alchemy and Infura.  Therefore, ZeroDev partners with multiple bundler providers to offer a *meta bundler network* that distributes AA transactions across multiple providers, such that when one fails, another seamlessly takes over.

As a result, AA applications built on ZeroDev get higher uptime than what can typically be achieved with any single bundler provider.

## Next Steps

- If you are not sure if ZeroDev is right for you, [read this](/who-is-zerodev-for).
- If you are ready to code, start with [the tutorial](/getting-started).
- Learn how to [create AA wallets](/create-wallets/overview).
- Learn how to [use AA wallets](/use-wallets/overview) to build powerful Web3 experiences.