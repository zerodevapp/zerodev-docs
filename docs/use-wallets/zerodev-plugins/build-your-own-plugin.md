---
sidebar_position: 2
---

# Build your own plugin

ZeroDev plugins are smart contracts that modify *how transactions are validated*.

By default, a ZeroDev wallet simulates the behavior of a [EOA](https://ethereum.org/en/developers/docs/accounts/): there's a single key that's the owner of the wallet, and every valid transaction (aka "UserOperation" in ERC-4337) needs to be signed by the owner.

However, some of the most powerful Web3 experiences are only possible if we change the validation logic.  Here are a few examples:

- Session keys.  A Web3 game may need to send many transactions during a play session, and it can be annoying for the player to sign every transaction.  Instead, the player can create a "session key" -- a temporary key that can only perform certain in-game transactions -- and hand the key to the game.  The game can then send transactions for the user without bothering them with signing.

- Subscriptions.  A true subscription experience, where the subscriber can automatically pay every subscription period, is not possible with EOA wallets, since the owner has to sign every transaction.  Rather, it would be ideal if the subscriber can authorize the seller to send a transaction for them to pay for the product every subscription period.

As you can see, the key (pun intended) to enabling a seamless Web3 experience lies in the ability to program arbitrary rules for transaction validation, which is exactly what AA is about.

# ZeroDev Plugin Framework

We can't talk about building custom validation logic without first explaining how validation works in ERC-4337.

At its core, accounts in ERC-4337 handle validation with a function called [`validateUserOp`](https://github.com/eth-infinitism/account-abstraction/blob/7368f3d1df9227946b39ca041adaf9944e398d5d/contracts/core/BaseAccount.sol#L40-L41):

```solidity
function validateUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 missingAccountFunds)
    external override virtual returns (uint256 validationData) {
  // validation logic
}
```

But since smart contract code is immutable, how do we go about implementing custom validation logic?

ZeroDev achieves it through a *plugin framework*.  At a high level, you can imagine that our `validateUserOp` looks like this (in pseudo-solidity):

```solidity
function validateUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 missingAccountFunds)
    external override virtual returns (uint256 validationData) {
  if (isPluginRegistered()) {
    plugin.validateUserOp(userOp, userOpHash, missingAccountFunds);
  } else {
    // proceed as usual
  }
}
```

That is, ZeroDev accounts are programmed such that it first checks if there's an active plugin, and if so, it *delegates* the validation logic to the plugin.  Otherwise it proceeds normally, i.e. checking that the transaction is signed by the owner.

Therefore, building a ZeroDev plugin comes down to building a contract that implements the `validateUserOp` function.  To show you how it's done, we will now walk through a tutorial to build a plugin for session keys.

# Tutorial: Session Keys

In this tutorial, we will create a "superpower session key"

We have compiled a list of questions that you should ask yourself before implementing a plugin:

- Who is sending the transaction?
- Other than 

When you build a plugin, you start by asking the following question: who is going to be sending transactions?

With a session key plugin, the transaction sender is no longer the wallet owner -- it's whoever the owner has given a session key to, e.g. a Web3 game.

- What am I trying to do?
- Who is going to be sending transac
