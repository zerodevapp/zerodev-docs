---
sidebar_position: 1
sidebar_label: Overview
---

# Extending Smart Wallets

Every ZeroDev wallet, by default, runs on [**Kernel**](https://github.com/zerodevapp/kernel) -- a minimal and extensible smart contract account.

By itself, Kernel does only the bare minimum for a smart contract account.  The magic is that Kernel is *extensible* -- developers can write plugins to augment Kernel's functionalities, in a way that fits the needs of their particular application.

## How Kernel Works

While Kernel is compatible in principle with any account abstraction (AA) system, it's primarily designed to work with [ERC-4337](https://github.com/eth-infinitism/account-abstraction/blob/develop/eip/EIPS/eip-4337.md).  To understand how Kernel works, let's look at the lifecycle of a ERC-4337 transaction processed by Kernel.

In ERC-4337, there is a global `EntryPoint` contract that invokes smart contract accounts to process transactions.  To differentiate between regular transactions and AA transactions, we call the AA transactions "user operations," or "UserOps" for short.

A `UserOp` is processed in two phases: a "validation phase" and an "execution phase."  Correspondingly, Kernel also supports two types of plugins: "validators" and "executors."

### Validation Phase

In the validation phase, the `EntryPoint` calls the `validateUserOp` function on Kernel.  Transactions to Kernel can be executed in one of three "modes," as indicated by the first few bytes of the UserOp's `signature` field.

- Sudo mode (0x0)

  In sudo mode, Kernel's "default validator" is invoked.  The default validator is a plugin that determines how transactions are validated by default (that is, if the transaction is not handled by another plugin).  In ZeroDev, the default validator is normally set to the [ECDSA validator](https://github.com/zerodevapp/kernel/blob/main/src/validator/ECDSAValidator.sol), which approves a transaction if it's signed by the owner through ECDSA -- just like a regular transaction.

- Plugin mode (0x1)

  In plugin mode, Kernel "looks up" the validator to use by the function selector from the `calldata`.  The mapping between function selectors and validators are set through the "enable mode," which will be explained later.

  In any case, once a validator has been looked up, it's used to validate the transaction.

- Enable mode (0x2)

  In enable mode, Kernel "enables" a validator, and it does so by associating the current function selector with the validator.  The validator's address (keep in mind that plugins are smart contracts) is encoded inside the `signature` itself.

  Once enabled, the validator will be used to validate this and every subsequent invocation of the same function in plugin mode.

### Execution Phase

In enable mode, Kernel actually associates with the function selector not just the validator, but also the executor.  Executors are smart contracts that actually implement the function that corresponds to the selector.  That is, when you call the function `kernel.someFunction()`, the `someFunction` is actually implemented in an executor, not the `kernel` itself.

When EntryPoint calls the function, Kernel uses a [fallback function](https://docs.soliditylang.org/en/v0.8.20/contracts.html#fallback-function) to look up the executor associated with the function selector, then `delegatecall`s the executor to execute the function.  If you are familiar with EIP-2535 aka "Diamond Proxies," you can think of executors as "facets."

## Next Steps

For many use cases, Kernel itself should be sufficient and you won't need to write your own plugins.  But if you do, go ahead and read [the tutorial for building a plugin](/extend-wallets/build-a-plugin).