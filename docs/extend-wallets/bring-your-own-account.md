---
sidebar_position: 3
---

# Bring Your Own Account

:::info
This document describes an advanced use case.  If you are not sure if this is relevant for you, it's probably not and you can safely skip it.
:::

While ZeroDev comes with a default AA account implementation known as the Kernel, you are free to use your own AA account implementation with the rest of ZeroDev, such as the SDK, the gas sponsoring engine, and the meta bundler.

## Implementing the account interface

To use your own account with the ZeroDev SDK, you must implement a standard `BaseAccountAPI` interface in TypeScript or JavaScript.

At a high level, the `BaseAccountAPI` asks you to define a number of functions that our SDK can then use to implement smart wallet functionalities, such as batching transactions, delegate calling, etc.

We recommend reading the following code files to understand how to implement the account interface:

- [The `BaseAccountAPI` interface](https://github.com/zerodevapp/sdk/blob/main/packages/sdk/src/BaseAccountAPI.ts#L55).

- [An implementation of the `BaseAccountAPI` known as the `SimpleAccountAPI`](https://github.com/zerodevapp/sdk/blob/main/packages/sdk/src/SimpleAccountAPI.ts#L31).

## Using your account with the SDK

Once you have implemented an account, you can use it with the SDK by passing in an `implementation` parameter when intializing the SDK:

```typescript
import { getZeroDevSigner } from '@zerodevapp/sdk'

const signer = await getZeroDevSigner({
  projectId: "<project id>",
  owner: someOwner,
  implementation: {
    factoryAddress: "<your factory address>",
    accountAPIClass: YourAccountClass,
  }
})
```

Here, `factoryAddress` is your account factory address, whereas `accountAPIClass` is the class that implements the account interface.