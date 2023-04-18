---
sidebar_position: 4
---

# Transfer All Assets

If you use ZeroDev to create embedded wallets, you might wonder how your users can transition to using their own wallets. 

With a traditional EOA wallet provider, you can typically "export" the wallet's private key.  The user would then import the private key into their wallet app of choice, e.g. MetaMask.

This approach, while simple, is fundamentally insecure.  With a EOA wallet, whoever owns the key owns the wallet.  The fact that the private key was generated on your wallet provider's server, then transmitted over the internet, poses an unacceptable amount of risks for your user.  Imagine the nightmare scenario where, a year after the exporting, when your user has accumulated sizable assets to their wallet, it turned out that some hacker had the key all along, and they drain your user's funds.

With AA, we can do better.

## Transferring Assets

If exporting private keys is so insecure, you might wonder why it isn't more common to simply transfer assets to the new wallet.

With a EOA wallet, transferring assets is extremely painful: you have to send two transactions ("approve" and "transfer") *per asset type*.   So if your embedded wallet has many types of assets, the user may have to send tens of transactions to fully transfer all assets.

Since AA wallets are smart contract wallets, we can perform a [batch transaction](/use-wallets/batch-transactions) to transfer ALL assets **in one transaction**.  This dramatically improves the UX for transferring assets.

## API

### Listing assets

To get a list of assets (including ERC20, ERC721, and ERC1155):

```typescript
// signer is a ZeroDevSigner
const assets = await signer.listAssets()
```

ZeroDev uses [Moralis](https://moralis.io/) internally to get the list of assets.

### Transferring all assets

To transfer all assets in a single transaction:

```typescript
// signer is a ZeroDevSigner
// assets is returned from listAssets
await signer.transferAllAssets('<target-address>', assets)
```

Needless to say, this is a security-critical operation and you need to be extremely careful with it.