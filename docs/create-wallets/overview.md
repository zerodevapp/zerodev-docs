---
sidebar_position: 1
---

# Overview

ZeroDev supports many ways to create AA wallets, but which one is right for your project?

Here is a set of questions you can ask to figure out the right approach for you:

- Does your project already have an existing Web2 account system, and you just want to tie a wallet to each user account?
  - If so, you might want to [create wallets with user IDs](/create-wallets/user-id).
- Are you building a DApp that wants to onboard Web2 users?
  - If so, you might want to [create wallets with social logins](/create-wallets/social/ethers).
- Does your project already manage private keys for users?
  - If so, you might want to [create wallets with private keys](/create-wallets/private-keys).
- Do you want to use a EOA provider such as Web3Auth/Magic/MetaMask to handle the login experience, while using ZeroDev for wallets?
  - If so, you might want to [create wallets with RPC provider](/create-wallets/rpc-provider).

## API

ZeroDev wallets can be used through two interfaces:

- [Ethers.js](https://docs.ethers.org/): you can access a ZeroDev wallet as an instance of `ZeroDevSigner`, which is compatible with Ethers' [`Signer` interface](https://docs.ethers.org/v5/api/signer/).  As a result, you can use the signer just like a regular Ethers signer (e.g. to sign messages and send transactions), but it also exposes additional AA functions which are detailed in [Use AA Wallets](/use-wallets/overview).

- [Wagmi](https://wagmi.sh/): you can create ZeroDev wallets through Wagmi connectors, and access the wallet through Wagmi hooks like `useSigner` as well as our custom AA hooks like `useContractBatchWrite`.

Each of the following sections will document both the Ethers and the Wagmi API.

## Options

Both Ethers and Wagmi APIs support a set of options when creating AA wallets.  For brevity, we will only be showing the required options in the following pages, but you can pass additional options like:

```typescript
const signer = await getZeroDevSigner({
  // required...
  projectId: "<project id>",
  owner: getPrivateKeyOwner("<private key>"),
  // options...
  index: 1,
})
```

ZeroDev supports the follwing options:

- `index`: with the same owner, you can create different accounts, similar to how in MetaMask you can create multiple accounts from the same seed phrase.  Each index maps to a unique account, given the same owner.

- `rpcProviderUrl`: if you want to use your own RPC provider (recommended for production usage), such as Infura or Alchemy, you can specify its URL here.

- `bundlerUrl`: if you want to use your own bundler, you can specify its URL here.

- `hooks`: a set of callbacks invoked at different points of the transaction lifecycle.  This is useful if you want to, say, display some custom UI when a transaction is being requested.