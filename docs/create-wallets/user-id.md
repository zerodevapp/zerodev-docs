---
sidebar_position: 4
---

# Create Wallets with User IDs

If you already have existing Web2 users, and you simply want to create a Web3 wallet for each user, you can create custodial ZeroDev wallets that are identified by unique identifiers (IDs) from your application. 

But wait, did I just say "custodial?" Isn't that the worst??

The beauty of ZeroDev wallets is that they can be progressively non-custodial.  To understand how that's possible, we need to clear up a few concepts.

## Key vs Account

When we talk about a "wallet," we are actually talking about two things:

- `Key`: the cryptographic key used for signing messages and transactions for the account.
- `Account`: the blockchain entity associated with an address, a balance, and other state.

For an *externally owned account* (EOA), e.g. a MetaMask account, the account address is cryptographically link to the key.  Therefore, it's not possible to change the key for an account.  In other words, for EOAs, 1 key == 1 account.

AA wallets like ZeroDev are smart contract accounts, however.  A smart contract account has its own address, which is independent of the key that manages it.  As a result, it's possible to *replace* the key with another key, without changing the blockchain address of the account at all.

In this article we will show how to create AA wallets with user IDs.  To learn how to let users take control with their own keys, see [Replace Wallet Owner](/use-wallets/replace-wallet-owner).

## Tutorial: Integrating Custom Web2 Login with ZeroDev

UPCOMING

## API

### Ethers

UPCOMING

### Wagmi