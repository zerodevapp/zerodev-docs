---
sidebar_position: 1
---

# Overview

ZeroDev integrates with most popular onboarding/authentication solutions, so that no matter how you handle authentication, you can create smart wallets for your users.

Broadly speaking, we divide our integrations into the following types.  Click on the onboarding solution that you are using or planning to use.

### "Connect Wallet" kits

- RainbowKit
- ConnectKit
- Web3Modal
- Custom "Connect Wallet" UI

### Embedded wallet providers

- Magic
- Web3Auth
- Dynamic (beta)
- Privy (beta)
- Portal (beta)

### Key infrastructure

- Custom private keys or signers
- Fireblocks (beta)
- Turnkey (beta)

### Web2 auth

- OAuth
- Email
- Auth0
- JWT
- Custom auth

## API

Unless otherwise noted, all ZeroDev integrations share the same API.

All integrations return a `ZeroDevSigner` object, which is an implementation of [Ethers signer](https://docs.ethers.org/v5/api/signer/).  With a signer, you can do anything that you would expect a wallet to do, such as sending transactions, signing messages, getting the address, etc.

For example, here's how you would use a ZeroDev signer to interact with a smart contract (which is exactly the same as how you would use a regular Ethers signer):

```typescript
import { Contract } from "ethers"

const nftContract = new Contract(contractAddress, contractABI, zerodevSigner)
await nftContract.mint()
```

Of course, the beauty of ZeroDev is that it can do *more* than a regular wallet.  Check out the ["Use AA Wallets"](/use-wallets/overview) document for all smart wallet features.