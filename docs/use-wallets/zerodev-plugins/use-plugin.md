---
sidebar_position: 1
---

# Use Plugin

Using plugin will require user to have a `EIP4337PluginFallbck` as fallback module. This module can handle classic EIP4337's validateUserOp, and plugin based validateUserOp.

If plugin fallback is set, userOp with signature longer than 97 will automatically considered as plugin based userOp.

Signature of userOp is constructed as following

```
signature[0:20] = pluginAddress
signature[20:26] = validUntil
signature[26:32] = validAfter
signature[32:97] = user signed signature
signature[97:] = abi.encode(bytes pluginData, bytes pluginProof)
```

user will be required to sign the data using EIP712 with struct [`ValidateUserOpPlugin`](#ValidateUserOpPlugin)

By signing the signature, user should be noticed that they are delegating validation process to plugin, thus plugin can do anything with their wallet.

Also, it should be aware that `validUntil`, `validAfter` value should be tight enough to make user feel safe.

# Reference

## ValidateUserOpPlugin

```solidity
struct ValidateUserOpPlugin {
    address sender;
    uint48 validUntil;
    uint48 validAfter;
    address plugin;
    bytes data;
}
```