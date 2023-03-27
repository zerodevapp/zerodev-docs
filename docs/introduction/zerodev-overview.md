---
sidebar_position: 1
slug: /
---

# ZeroDev Overview

ZeroDev offers smart wallets as a service, powered by account abstraction (AA).  This is accomplished through five product pillars:

- A set of **smart wallet factories** for creating smart wallets from any authentication methods, including private keys, RPC providers, OAuth/JWT, biometrics, etc.
- A smart contract **wallet kernel** designed for quickly building AA wallets on top, along with a set of wallet plugins for enabling common smart wallet functionalities, such as session keys, subscriptions, etc.
- Ethers and Wagmi **SDKs** for interacting with smart wallets.
- A **gas sponsoring policy engine** for setting up fine-grained gas sponsoring policies, such as "only sponsor up to 0.01 ETH worth of gas for each user for interacting with contract X."
- A **meta bundler network** that spreads AA transactions across multiple bundler providers to ensure high uptime.

TLDR: you use ZeroDev to offer production-grade smart wallets for your customers.

If you are not sure why smart wallets are good, [read this first](/introduction/why-account-abstraction).  Otherwise, Let's dive into ZeroDev.

## Smart Wallet Factories

To use a smart wallet, you first have to create one.  With ZeroDev, you can create smart wallets with all kinds of authentication methods, including private keys, RPC providers (e.g. Web3Auth/Magic), OAuth/JWT/Auth0, and even biometrics.

No matter how your users log into your application, there's a way to create smart wallets for them.

## Wallet Kernel

At the core of ZeroDev is the wallet kernel -- an implementation of a ERC-4337-compatible smart contract wallet that is designed to be extended.

On its own, the wallet kernel is already a complete wallet (or more precisely, an on-chain "account").  It supports all the most common functionalities that people typically associate with smart contract wallets, such as bundling transactions, verifying signatures, etc.

What makes the wallet a *kernel*, however, is that it can be extended.  We have designed a *wallet plugin framework* where developers can write solidity code to build app-specific wallet features.  The best part?  We've already built the most commonly used plugins such as session keys and subscriptions, so you can just use them.

By building on top of ZeroDev, you can vastly shorten the time it takes to ship a customized AA wallet, while ensuring that the core of the wallet is highly optimized, audited, and compatible with AA standards (e.g. ERC-4337).

## Account Abstraction SDK

AA wallets expose a set of powerful interfaces, and the DApp (or the wallet UI) needs to be able to talk to these interfaces in order to take advantage of AA features such as bundling transactions.

To that end, ZeroDev provides an SDK with both an Ethers and a Wagmi API for interacting with AA wallets.

## Gas Sponsoring Policy Engine

The most common use case for smart wallets is sponsoring gas for users, but you rarely want to sponsor *all* transactions.  Rather, you probably have a specific set of criteria for sponsoring transactions, whether it's based on frequency, amount, the contract being interacted with, or something else entirely.

To enable all these different criteria, we have built a powerful *policy engine* for sponsoring gas, which can be accessed both programmatically (through an API) and manually (through a dashboard).

## Meta Bundler Network

In ERC-4337, bundlers are the underlying nodes that handle AA transactions.  Therefore, reliable access to bundlers is key to building a smooth AA experience.

However, since the AA ecosystem is at an early stage of development, bundlers are not yet as reliable as normal Ethereum nodes such as those provided by Alchemy and Infura.  Therefore, ZeroDev partners with multiple bundler providers to offer a *meta bundler network* that distributes AA transactions across multiple providers, such that when one fails, another seamlessly takes over.

As a result, AA applications built on ZeroDev get higher uptime than what can typically be achieved with any single bundler provider.

## Next Steps

- If you are not sure if ZeroDev is right for you, [read this](/introduction/who-is-zerodev-for).
- If you are ready to code, start with [the tutorial](/getting-started).
- Learn how to [create AA wallets](/create-wallets/overview).
- Learn how to [use AA wallets](/use-wallets/overview) to build powerful Web3 experiences.