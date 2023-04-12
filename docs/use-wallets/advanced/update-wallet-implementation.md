---
sidebar_position: 3
---

# Update Wallet Implementation

:::danger
This document describes the process for updating from a ZeroDev wallet implementation to a non-ZeroDev wallet implementation.

Updating your wallet implementation is a very dangerous action.  If your new wallet implementation is incorrectly implemented, your wallet may become "bricked" and stop functioning.

If in doubt, please [join our Discord](https://discord.gg/KS9MRaTSjx) to ask questions.
:::

ZeroDev wallets are upgradable proxies (specifically EIP-1967 "transparent proxies"), and as such the wallet owner can switch to another wallet implementation, while keeping the same wallet address.

Keep in mind that updating the wallet implementation is very dangerous, and you probably don't want to do this unless you know exactly what you are doing.

## API

Updating the wallet implementation is very simple: simply call the `upgradeTo` function on the wallet address itself:

```typescript
// `signer` is a ZeroDevSigner
const address = await signer.getAddress()

const selfContract = new Contract(address, [
  'upgradeTo(address _newImplementation)',
], signer);

await selfContract.upgradeTo(newImplementationAddress)
```