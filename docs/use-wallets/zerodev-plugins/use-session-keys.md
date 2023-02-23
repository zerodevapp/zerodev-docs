---
sidebar_position: 2
---

# Use session keys

If user approved a session key plugin, user will be allowing the "sessionKey" to sign userOp on their behalf.

userOp's signature will have `pluginData` and `pluginProof` appended to it.

`pluginData` will represent sessionKey that is used to sign the userOp.

`pluginProof` will represent the signature of the userOp signed by sessionKey.

sessionKey is required to sign the userOpHash and sessionNonce using EIP712 with struct [`Session`](#Session)

# Reference

## Session

```solidity
struct Session {
    bytes32 userOpHash;
    uint256 nonce;
}
```