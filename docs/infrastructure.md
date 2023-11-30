---
sidebar_position: 7
---

# Supported Bundlers

In [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337), UserOps are relayed by servers known as "bundlers," and their gas can paid for by "paymasters."

ZeroDev uses a unique "meta infrastructure" -- we work with various bundler/paymaster providers and shard the traffic between them.  When you use a ZeroDev, you can specify the provider you'd like to use (if you don't, we just pick a default one for you).

We currently support the following providers (in alphabetical order):

- Alchemy
- Gelato
- Pimlico
- StackUp

Since AA is a new technology, it's not uncommon to run into stability issues with the underlying provider.  If you do, you can simply switch to another provider with our SDK.

To specify a provider, use the `bundlerProvider` flag when you initialize the SDK:

```typescript
const ecdsaProvider = await ECDSAProvider.init({
  // ...other options
  opts: {
    // this can be "ALCHEMY", "GELATO", "PIMLICO", "STACKUP"
    bundlerProvider: "PROVIDER_NAME",
  }
})
```