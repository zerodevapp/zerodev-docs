# Additional Settings

All ZeroDev integrations support the same options, which we will document here.  You can pass options like:

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

- `bundlerUrl`: if you want to use your own bundler, you can specify its URL here.  We recommend [Stackup](https://stackup.sh/) if you want to use a third-party bundler provider.

- `hooks`: a set of callbacks invoked at different points of the transaction lifecycle.  This is useful if you want to, say, display some custom UI when a transaction is being requested.