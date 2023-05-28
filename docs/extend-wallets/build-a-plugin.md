---
sidebar_position: 2
---

# Build a Plugin

:::info
Incorrectly implemented plugins can brick your wallet or otherwise result in loss of funds.  If you are building a plugin, we strongly encourage that you get in touch with our team on [Discord](https://discord.gg/KS9MRaTSjx) so we can provide a review.
:::

If you haven't already, make sure you read [the overview](/extend-wallets/overview) so you understand how Kernel works from a high level.  This document will dive into the details of writing a plugin.

As mentioned in the overview, there are two kinds of plugins: validators and executors.

## Writing a Validator

A validator modifies how transactions are validated.  Validators must implement the [`IKernelValidator` interface](https://github.com/zerodevapp/kernel/blob/main/src/validator/IValidator.sol):

```solidity
interface IKernelValidator {
    function enable(bytes calldata _data) external;

    function disable(bytes calldata _data) external;

    function validateUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 missingFunds)
        external
        returns (uint256);

    function validateSignature(bytes32 hash, bytes calldata signature) external view returns (uint256);
}
```

Here's an explanation of each function:

- `enable`: used in "enable mode" (see the overview) to enable the validator.  The `_data` should be whatever data you need to initialize the plugin.  For example, in the [ECDSA plugin](https://github.com/zerodevapp/kernel/blob/main/src/validator/ECDSAValidator.sol), the data is simply the owner address.

- `disable`: used to disable the validator.  To use this function, the user calls it directly on the validator contract.

- `validateUserOp`: implements custom validation logic for this plugin.  The difference between this `validateUserOp` and the Kernel's `validateUserOp` is that the Kernel will "strip" the extra data (e.g. the "mode") from `userOp.signature` before passing it to this `validateUserOp`.

- `validateSignature`: validates signatures dynamically.  Only relevant if you want to use this validator as a "default validator," which we will explain later.

### Default Validator

Each Kernel account must have one "default validator."  A default validator is special in a few ways:

- It's the validator used in "sudo mode" (see overview).  In other words, when other validators are not used, the default validator is used by default (duh).
- It's the validator used in "enable mode" to check if it approves of the enabling of another validator.
- It's the validator used for checking signatures for ERC-1271.

The second and third points are the reasons why a default validator must implement a `validateSignature` method.

### Validator Storage

Since validators are invoked with `call`, it has its own storage and doesn't share storage with Kernel.

However, since validator storage is accessed during the validation phase, ERC-4337's "[storage rules](https://github.com/eth-infinitism/account-abstraction/blob/abff2aca61a8f0934e533d0d352978055fddbd96/eip/EIPS/eip-4337.md#storage-associated-with-an-address)" apply.  In particular, it means that you need to index storage by `msg.sender`.

For example, you cannot do this:

```solidity
bool enabled;
function validateUserOp(UserOperation calldata _op, ...) external {
    require(enabled);
}
```

But you can do this:

```solidity
mapping(address => bool) enabled;
function validateUserOp(UserOperation calldata _op, ...) external {
    require(enabled[_op.sender]);
}
```

### Validator Opcodes

Since validators are used during the validation phase, they cannot use any [forbidden opcodes](https://github.com/eth-infinitism/account-abstraction/blob/abff2aca61a8f0934e533d0d352978055fddbd96/eip/EIPS/eip-4337.md#forbidden-opcodes) defined in ERC-4337.

### Validator Examples

We strongly recommend that you read some of the following examples and make sure you understand how and why they work.

- [ECDSA validator](https://github.com/zerodevapp/kernel/blob/main/src/validator/ECDSAValidator.sol): the default "default validator" for ZeroDev accounts.  Mimics the behavior of an EOA -- simply checking that the account owner is signing correctly using ECDSA.

- [Kill switch validator](https://github.com/zerodevapp/kernel/blob/main/src/validator/KillSwitchValidator.sol): just like the ECDSA validator except that it allows for a "kill switch" -- a designated guardian can "turn off" the account and set a new owner, presumably because the original owner's key was compromised.

- [ERC165 session key validator](https://github.com/zerodevapp/kernel/blob/main/src/validator/ERC165SessionKeyValidator.sol): designed to work with a specific executor (explained later) that transfers NFTs.  This validator verifies that the executor is indeed interacting with a contract that implements the ERC721 interface.

## Writing an Executor

You have significantly more freedom when writing an executor than writing a validator, since they are just custom functions that you want to add "on top" of what Kernel already defines.  Furthermore, since executors are used during the execution phase, there are no opcode restrictions.

### Executor Storage

Executors are invoked with `delegatecall`, which means executors need to be extra careful to not touch any storage area used by Kernel.  Therefore, it's strongly encouraged that you use ["unstructured stroage" (aka "diamond storage")](https://dev.to/mudgen/how-diamond-storage-works-90e).

### Executor Examples

- [ERC721 transfer](https://github.com/zerodevapp/kernel/blob/main/src/actions/ERC721Actions.sol): a simple example of a custom function that transfers NFTs.  This executor is designed to work with the [ERC165 session key validator](https://github.com/zerodevapp/kernel/blob/main/src/validator/ERC165SessionKeyValidator.sol).