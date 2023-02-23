---
sidebar_position: 1
---

# Overview

ZeroDev supports many ways to create AA wallets, but which one is right for your project?

Here is a set of questions you can ask to figure out the right approach for you:

- Does your project already have an existing Web2 account system, and you just want to tie a wallet to each user account?
  - If so, you might want to [create wallets with user IDs](/create-wallets/user-id).
- Are you building a DApp that wants to onboard Web2 users?
  - If so, you might want to [create wallets with social logins](/create-wallets/zerokit/getting-started).
- Does your project already manage private keys for users?
  - If so, you might want to [create wallets with private keys](/create-wallets/private-keys).
- Do you want to use a EOA provider such as Web3Auth/Magic/MetaMask to handle the login experience, while using ZeroDev for wallets?
  - If so, you might want to [create wallets with RPC provider](/create-wallets/rpc-provider).

## API

ZeroDev wallets can be used through two interfaces:

- [Ethers.js](https://docs.ethers.org/): you can access a ZeroDev wallet as an instance of `ZeroDevSigner`, which is compatible with Ethers' [`Signer` interface](https://docs.ethers.org/v5/api/signer/).  As a result, you can use the signer just like a regular Ethers signer (e.g. to sign messages and send transactions), but it also exposes additional AA functions which are detailed in [Use AA Wallets](/use-wallets/overview).

- [Wagmi](https://wagmi.sh/):

Each of the following sections will document both the Ethers and the Wagmi API.